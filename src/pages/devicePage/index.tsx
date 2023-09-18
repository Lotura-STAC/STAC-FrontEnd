import { styled } from "styled-components";
import { useSocket } from "../../hooks/useSocket";
import { useRecoilState, useSetRecoilState } from "recoil";
import { RadioType } from "../../components/Radio";
import { LoginStateAtom } from "../../atoms/loginState";
import { DeviceStateAtom, DeviceStateAtomType } from "../../atoms/deviceState";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../../libs/utils/isLoggedIn";
import { authWhoami } from "../../libs/apis/auth/whoami";
import { refreshToken } from "../../libs/utils/refreshToken";
import { Header } from "../../components/Header";
import { Spinner } from "../../components/Spinner";
import { Menu } from "../../components/menu";
import { Grid } from "../../components/Grid";
import { Button } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { Logout } from "../../libs/utils/logout";

export const DevicePage = () => {
  const { data, status, uptime, connect, disconnect } = useSocket();
  const [loginState, setLoginState] = useRecoilState<RadioType>(LoginStateAtom);
  const setDeviceState =
    useSetRecoilState<DeviceStateAtomType>(DeviceStateAtom);
  const [deployState, setDeployState] = useState<boolean>(false);
  useEffect(() => {
    if (isLoggedIn) {
      setLoginState("guest");
      authWhoami()
        .then((response) => {
          setLoginState(response.data.role);
          setDeployState(true);
        })
        .catch(async () => {
          const isRefreshed = await refreshToken();
          if (isRefreshed)
            authWhoami()
              .then((response) => {
                setLoginState(response.data.role);
                setDeployState(true);
              })
              .catch(() => {
                alert("사용자 권한을 가져오는 데 실패했습니다.");
                setDeployState(true);
              });
          else {
            alert("로그인 세션이 만료되었습니다.");
            Logout();
          }
        });
      connect();
      window.onbeforeunload = () => disconnect();
    }
  }, []);
  useEffect(
    () =>
      setDeviceState((prevState) => {
        return {
          ...prevState,
          deviceResponses: data,
          status: status,
          uptime: uptime,
        };
      }),
    [data]
  );
  return (
    <>
      <Header />
      <Wrapper>
        {isLoggedIn ? (
          status === "loading" || deployState === false ? (
            <Spinner />
          ) : (
            <>
              {loginState === "admin" && <Menu />}
              <Grid />
            </>
          )
        ) : (
          <NotSigned>
            <h1>접근 권한이 없습니다.</h1>
            <div>
              <Button
                label="돌아가기"
                width={160}
                color="uncolored"
                type="a"
                to="/"
              />
              <Button
                label="로그인"
                width={160}
                color="colored"
                type="a"
                to="/login"
              />
            </div>
          </NotSigned>
        )}
      </Wrapper>
      <Footer status={status} uptime={uptime} />
    </>
  );
};

const Wrapper = styled.main`
  margin-top: 48px;

  width: 100vw;
  height: auto;
  min-height: calc(100vh - 209px);

  display: flex;
  flex-direction: column;
`;

const NotSigned = styled.div`
  margin-top: 48px;

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: ${({ theme }) => theme.colors.main2};
    font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
    font-size: ${({ theme }) => theme.fontSizes.subTitle};
  }

  div {
    margin-top: 16px;

    display: flex;
    gap: 24px;
  }
`;
