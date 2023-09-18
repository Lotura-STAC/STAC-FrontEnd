import styled from "styled-components";
import { useEffect, useState } from "react";
import { DarkIcons, LightIcons } from "../../assets/images";
import { Link } from "react-router-dom";
import { preference } from "../../styles/theme";
import { isLoggedIn } from "../../libs/utils/isLoggedIn";
import { Logout } from "../../libs/utils/logout";

export const Header = () => {
  const [hideState, setHideState] = useState<boolean>(false);
  useEffect(() => {
    let prevScrollTop = 0;
    const toggleHeader = () => {
      const nextScrollTop = window.pageYOffset || 0;
      if (prevScrollTop > 48 && nextScrollTop > prevScrollTop)
        setHideState(true);
      else if (nextScrollTop < prevScrollTop) setHideState(false);
      prevScrollTop = nextScrollTop;
    };
    document.addEventListener("scroll", toggleHeader);
    return () => document.removeEventListener("scroll", toggleHeader);
  }, []);
  const LogoImg = (
    preference === true ? LightIcons.LogoImg : DarkIcons.LogoImg
  ) as string;
  return (
    <Wrapper hide={`${hideState}`}>
      <Link to="/" role="heading" aria-label="메인으로">
        <figure>
          <picture>
            <source type="image/svg+xml" srcSet={LogoImg} />
            <img alt="로고" width="20" height="20" />
          </picture>
        </figure>
        LOTURA
      </Link>
      {isLoggedIn ? (
        <nav>
          <Link to="/device">마이페이지</Link>
          <button type="button" onClick={() => Logout()}>
            로그아웃
          </button>
          <a
            href="https://open.kakao.com/o/sot912Gf"
            target="_blank"
            rel="noopener noreferer nofollow"
          >
            고객센터
          </a>
        </nav>
      ) : (
        <nav>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
          <a
            href="https://open.kakao.com/o/sot912Gf"
            target="_blank"
            rel="noopener noreferer nofollow"
          >
            고객센터
          </a>
        </nav>
      )}
    </Wrapper>
  );
};

interface WrapperProps {
  hide: "true" | "false";
}

const Wrapper = styled.header<WrapperProps>`
  position: fixed;
  ${(props) => (props.hide === "true" ? `top: -48px;` : "top: 0;")}
  left: 0;

  background-color: ${({ theme }) => theme.colors.main3};

  padding-left: 10vw;
  padding-right: 10vw;

  width: 100%;
  height: 48px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: top 0.25s ease;
  z-index: 99;

  a,
  button {
    transition: filter 0.25s ease;
  }

  a:hover,
  button:hover {
    filter: brightness(115%);
  }

  > a:first-of-type {
    display: flex;
    align-items: center;
    gap: 8px;

    color: ${({ theme }) => theme.colors.main1};
    font-family: ${({ theme }) => theme.fontFamily.gothamLight};
    font-size: ${({ theme }) => theme.fontSizes.subTitle};
    font-weight: 300;
  }

  nav {
    display: flex;
    gap: 16px;

    a,
    button {
      color: ${({ theme }) => theme.colors.main1};
      font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
      font-size: ${({ theme }) => theme.fontSizes.text};
      font-weight: 300;
    }
  }
`;
