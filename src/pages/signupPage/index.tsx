import { styled } from "styled-components";
import { Header } from "../../components/Header";
import { Banner } from "../../components/Banner";
import { Footer } from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { authSignup } from "../../libs/apis/auth/signup";
import { useRecoilState } from "recoil";
import { AxiosStateAtom } from "../../atoms/axiosState";
import { isLoggedIn } from "../../libs/utils/isLoggedIn";
import { Radio, RadioType } from "../../components/Radio";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export const SignupPage = () => {
  const [axiosState, setAxiosState] = useRecoilState<boolean>(AxiosStateAtom);
  const [radioState, setRadioState] = useState<RadioType>("admin");
  const [inputState, setInputState] = useState({
    admin: {
      id: "",
      pw: "",
      pwConfirm: "",
    },
    guest: {
      id: "",
      pw: "",
      pwConfirm: "",
    },
  });
  const [warningState, setWarningState] = useState<string>("");
  useLayoutEffect(() => {
    if (isLoggedIn) window.location.replace("/");
  }, []);
  const navigate = useNavigate();
  const validateForm = (): boolean => {
    if (!inputState.admin.id.match(/^[a-z]+[a-z0-9]{3,15}$/g)) {
      setRadioState("admin");
      setWarningState(
        "관리자 계정의 아이디는 4-16자의 영문자 또는 숫자여야 합니다."
      );
      return false;
    }
    if (
      !inputState.admin.pw.match(
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/
      )
    ) {
      setRadioState("admin");
      setWarningState(
        "관리자 계정의 비밀번호는 8-16자로, 숫자와 특수문자를 포함해야 합니다."
      );
      return false;
    }
    if (inputState.admin.pw !== inputState.admin.pwConfirm) {
      setRadioState("admin");
      setWarningState("관리자 계정의 비밀번호가 일치하지 않습니다.");
      return false;
    }
    if (
      (inputState.guest.id !== "" || inputState.guest.pw !== "") &&
      !inputState.guest.id.match(/^[a-z]+[a-z0-9]{3,15}$/g)
    ) {
      setRadioState("guest");
      setWarningState(
        "사용자 계정의 아이디는 4-16자의 영문자 또는 숫자여야 합니다."
      );
      return false;
    }
    if (
      (inputState.guest.id !== "" || inputState.guest.pw !== "") &&
      !inputState.guest.pw.match(
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/
      )
    ) {
      setRadioState("guest");
      setWarningState(
        "사용자 계정의 비밀번호는 8-16자로, 숫자와 특수문자를 포함해야 합니다."
      );
      return false;
    }
    if (
      (inputState.guest.id !== "" || inputState.guest.pw !== "") &&
      inputState.guest.pw !== inputState.guest.pwConfirm
    ) {
      setRadioState("guest");
      setWarningState("사용자 계정의 비밀번호가 일치하지 않습니다.");
      return false;
    }
    setWarningState("");
    return true;
  };
  const submitForm = () => {
    if (validateForm() && axiosState === false) {
      setAxiosState(true);
      authSignup({
        admin_id: inputState.admin.id,
        admin_pw: inputState.admin.pw,
        guest_id: inputState.guest.id,
        guest_pw: inputState.guest.pw,
      })
        .then(() => {
          alert("회원가입이 성공적으로 완료되었습니다.");
          navigate("/login");
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
          회원가입
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
            value={inputState[radioState].id}
            setValue={(id: string) =>
              setInputState((prevState) => ({
                ...prevState,
                [radioState]: {
                  ...prevState[radioState],
                  id: id,
                },
              }))
            }
          />
          <Input
            id="pw"
            type="password"
            label="비밀번호"
            value={inputState[radioState].pw}
            setValue={(password: string) =>
              setInputState((prevState) => ({
                ...prevState,
                [radioState]: {
                  ...prevState[radioState],
                  pw: password,
                },
              }))
            }
          />
          <Input
            id="pwConfirm"
            type="password"
            label="비밀번호 재입력"
            value={inputState[radioState].pwConfirm}
            setValue={(password: string) =>
              setInputState((prevState) => ({
                ...prevState,
                [radioState]: {
                  ...prevState[radioState],
                  pwConfirm: password,
                },
              }))
            }
          />
          <Radio
            value={radioState}
            setValue={(newRadio: RadioType) => setRadioState(newRadio)}
          />
          <Button label="회원가입" width={320} color="colored" type="submit" />
          {warningState && <p>{warningState}</p>}
          <span>
            <strong>개인이 사용하는 경우,</strong> 관리자 계정으로만 회원 가입을
            진행해 주시기를 바랍니다.
          </span>
          <span>
            <strong>단체가 사용하는 경우,</strong> 관리자 계정과 사용자 계정을
            모두 기재하여 회원 가입을 진행해 주시기를 바랍니다.
          </span>
          <span>
            관리자 계정 입력창에서 사용자 계정 입력창으로 변경할 때, 관리자 계정
            입력창에 입력된 내용은 모두 유지됩니다.
          </span>
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

  span {
    width: 320px;

    color: ${({ theme }) => theme.colors.main2};
    font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
    font-size: ${({ theme }) => theme.fontSizes.text};

    strong {
      color: ${({ theme }) => theme.colors.main2};
      font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
      font-size: ${({ theme }) => theme.fontSizes.text};
      text-decoration: underline;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.error};
    font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
    font-size: ${({ theme }) => theme.fontSizes.text};

    ${({ theme }) => theme.animations.flash}

    animation: flash 0.25s ease;
  }
`;
