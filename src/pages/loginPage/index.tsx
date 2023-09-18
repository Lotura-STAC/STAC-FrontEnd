import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { AxiosStateAtom } from "../../atoms/axiosState";
import { useLayoutEffect, useState } from "react";
import { AuthLoginRequestType } from "../../types/auth/login/request";
import { isLoggedIn } from "../../libs/utils/isLoggedIn";
import { authLogin } from "../../libs/apis/auth/login";
import { setCookie } from "../../libs/utils/cookie";
import { Header } from "../../components/Header";
import { Banner } from "../../components/Banner";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Footer } from "../../components/Footer";

export const LoginPage = () => {
  const [axiosState, setAxiosState] = useRecoilState<boolean>(AxiosStateAtom);
  const [inputState, setInputState] = useState<AuthLoginRequestType>({
    id: "",
    pw: "",
  });
  const [warningState, setWarningState] = useState<string>("");
  useLayoutEffect(() => {
    if (isLoggedIn) window.location.replace("/");
  }, []);
  const validateForm = (): boolean => {
    if (inputState.id === "") {
      setWarningState("아이디를 입력하지 않았습니다.");
      return false;
    }
    if (inputState.pw === "") {
      setWarningState("비밀번호를 입력하지 않았습니다.");
      return false;
    }
    setWarningState("");
    return true;
  };
  const submitForm = () => {
    if (validateForm() && axiosState === false) {
      setAxiosState(true);
      authLogin(inputState)
        .then((response) => {
          setCookie("accessToken", response.data.accessToken, {
            path: "/",
            secure: true,
            sameSite: "none",
          });
          setCookie("refreshToken", response.data.refreshToken, {
            path: "/",
            secure: true,
            sameSite: "none",
          });
          alert("로그인이 성공적으로 완료되었습니다.");
          window.location.replace("/");
          setAxiosState(false);
        })
        .catch((err) => {
          setWarningState(err.response.data);
          setAxiosState(false);
        });
    }
  };
  return isLoggedIn === false ? (
    <>
      <Header />
      <Wrapper>
        <Banner>
          <Button
            label="로그인"
            width={160}
            color="uncolored"
            type="a"
            to="/login"
          />
          <Button
            label="회원가입"
            width={160}
            color="colored"
            type="a"
            to="/signup"
          />
        </Banner>
        <h2>
          <Link to="/" aria-label="뒤로 가기">
            ←
          </Link>
          로그인
        </h2>
        <Form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <Input
            id="id"
            type="text"
            label="아이디"
            value={inputState.id}
            setValue={(id: string) =>
              setInputState((prevState) => ({
                ...prevState,
                id: id,
              }))
            }
          />
          <Input
            id="pw"
            type="password"
            label="비밀번호"
            value={inputState.pw}
            setValue={(pw: string) =>
              setInputState((prevState) => ({
                ...prevState,
                pw: pw,
              }))
            }
          />
          <Button label="로그인" width={320} color="colored" type="submit" />
          {warningState && <p>{warningState}</p>}
        </Form>
      </Wrapper>
      <Footer />
    </>
  ) : (
    <></>
  );
};

const Wrapper = styled.main`
  margin-bottom: 48px;

  width: 100vw;
  height: auto;
  min-height: calc(100vh - 210px);

  display: flex;
  flex-direction: column;

  h2 {
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    margin-top: 48px;

    width: 320px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme.colors.main1};
    font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
    font-size: ${({ theme }) => theme.fontSizes.subTitle};
    text-align: center;

    a {
      position: absolute;
      left: 0;

      color: ${({ theme }) => theme.colors.main2};
      font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
      font-size: ${({ theme }) => theme.fontSizes.text};
      font-weight: 300;
    }
  }
`;

const Form = styled.form`
  margin-top: 8px;

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  button {
    margin-top: 8px;
  }

  p {
    color: ${({ theme }) => theme.colors.error};
    font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
    font-size: ${({ theme }) => theme.fontSizes.text};

    ${({ theme }) => theme.animations.flash}

    animation: flash 0.25s ease;
  }
`;
