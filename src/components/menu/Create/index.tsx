import { styled } from "styled-components";
import { MenuType } from "..";
import { useRecoilState, useSetRecoilState } from "recoil";
import { AxiosStateAtom } from "../../../atoms/axiosState";
import {
  DeviceStateAtom,
  DeviceStateAtomType,
} from "../../../atoms/deviceState";
import { useState } from "react";
import { preference } from "../../../styles/theme";
import { DarkIcons, LightIcons } from "../../../assets/images";
import { DeviceType } from "../../../types/device";
import { solveDeviceType } from "../../../libs/utils/solveDeviceType";
import { deviceCreate } from "../../../libs/apis/device/create";
import { refreshToken } from "../../../libs/utils/refreshToken";
import { Logout } from "../../../libs/utils/logout";
import { Select } from "../../Select";

interface MenuMainProps {
  setMenuState: (newPage: MenuType) => void;
}

export const MenuCreateDevice = ({ setMenuState }: MenuMainProps) => {
  const [axiosState, setAxiosState] = useRecoilState<boolean>(AxiosStateAtom);
  const setDeviceState =
    useSetRecoilState<DeviceStateAtomType>(DeviceStateAtom);
  const [inputState, setInputState] = useState<{
    device_no: string;
    device_type: string;
    name: string;
  }>({
    device_no: "",
    device_type: "세탁기",
    name: "",
  });
  const [warningState, setWarningState] = useState<string>("");
  const AddImg = (
    preference === true ? LightIcons.AddImg : DarkIcons.AddImg
  ) as string;
  const validateForm = (): boolean => {
    if (inputState.name === "") {
      setWarningState("장치 이름을 입력하세요.");
      return false;
    }
    if (inputState.device_no === "") {
      setWarningState("장치 고유번호를 입력하세요.");
      return false;
    }
    if (!inputState.device_no.match(/^[a-z]+[a-z0-9]$/g)) {
      setWarningState("영문자 또는 숫자만 입력하세요.");
      return false;
    }
    setWarningState("");
    return true;
  };
  const submitForm = () => {
    if (validateForm() && axiosState === false) {
      setAxiosState(true);
      const data: DeviceType = {
        curr_status: 1,
        device_no: inputState.device_no,
        device_type: solveDeviceType(inputState.device_type),
        name: inputState.name,
        x_pos: 0,
        y_pos: 0,
      };
      deviceCreate(inputState)
        .then(() =>
          setDeviceState((prevState) => {
            return {
              ...prevState,
              deviceResponses: [...prevState.deviceResponses, data],
            };
          })
        )
        .catch(async () => {
          const isRefreshed = await refreshToken();
          if (isRefreshed)
            deviceCreate(inputState)
              .then(() =>
                setDeviceState((prevState) => {
                  return {
                    ...prevState,
                    deviceResponses: [...prevState.deviceResponses, data],
                  };
                })
              )
              .catch(() => alert("알 수 없는 오류가 발생하였습니다."));
          else {
            alert("로그인 세션이 만료되었습니다.");
            Logout();
          }
        });
      setAxiosState(false);
    }
  };
  return (
    <Wrapper>
      <Title>
        <button
          type="button"
          aria-label="뒤로 가기"
          onClick={() => setMenuState("main")}
        >
          ←
        </button>
        등록
      </Title>
      <Form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          submitForm();
        }}
        preference={`${preference}`}
      >
        <div>
          <label htmlFor="name-input">장치 이름</label>
          <input
            value={inputState.name}
            onChange={(e) => {
              const data = e.currentTarget.value;
              if (data !== null)
                setInputState((prevState) => ({
                  ...prevState,
                  name: data,
                }));
            }}
            id="name-input"
          />
        </div>
        <div>
          <label htmlFor="name-input">장치 고유번호</label>
          <input
            value={inputState.device_no}
            onChange={(e) => {
              const data = e.currentTarget.value;
              if (data !== null)
                setInputState((prevState) => ({
                  ...prevState,
                  device_no: data,
                }));
            }}
            id="device_no-input"
            type="password"
          />
        </div>
        <Select
          id="device_type"
          options={["세탁기", "건조기"]}
          value={inputState.device_type}
          setValue={(newType: string) =>
            setInputState((prevState) => {
              return { ...prevState, device_type: newType };
            })
          }
        />
        <button type="submit">
          <figure>
            <picture>
              <source type="image/svg+xml" srcSet={AddImg} />
              <img alt="" width="16" height="16" />
            </picture>
          </figure>
          등록
        </button>
        {warningState && <p>{warningState}</p>}
      </Form>
    </Wrapper>
  );
};

const Title = styled.h2`
  position: relative;

  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.main1};
  font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
  font-size: ${({ theme }) => theme.fontSizes.subTitle};

  button {
    position: absolute;
    left: 0;

    color: ${({ theme }) => theme.colors.main2};
    font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
    font-size: ${({ theme }) => theme.fontSizes.text};
    font-weight: 300;
  }
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.main3};

  padding: 8px 16px;

  width: 160px;
  height: 325px;

  display: flex;
  flex-direction: column;
  gap: 4px;

  border-top-right-radius: 8px;
`;

interface FormProps {
  preference: "true" | "false";
}

const Form = styled.form<FormProps>`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  > p {
    width: 100%;

    color: ${({ theme }) => theme.colors.error};
    font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
    font-size: ${({ theme }) => theme.fontSizes.text};

    ${({ theme }) => theme.animations.flash}

    animation: flash 0.25s ease;
  }

  > div {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    label {
      color: ${({ theme }) => theme.colors.main2};
      font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
      font-size: ${({ theme }) => theme.fontSizes.subText};
    }

    input {
      padding: 8px 12px;

      width: 100%;
      height: 36px;

      color: ${({ theme }) => theme.colors.main2};
      font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
      font-size: ${({ theme }) => theme.fontSizes.text};
      font-weight: 300;

      border-radius: 8px;
      border: 1px solid ${({ theme }) => theme.colors.main2};
    }

    ${(props) =>
      props.preference === "true" &&
      `::-ms-reveal {
      filter: invert(1);
    }`}
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    color: ${({ theme }) => theme.colors.main2};
    font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;
