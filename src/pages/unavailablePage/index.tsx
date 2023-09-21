import { styled } from "styled-components";
import { preference } from "../../styles/theme";
import { DarkIcons, LightIcons } from "../../assets/images";

export const UnavailablePage = () => {
  const GoogleImg = (
    preference === true ? DarkIcons.GoogleImg : LightIcons.GoogleImg
  ) as string;
  return (
    <Wrapper>
      <Unavailable>
        <h1>LOTURA 웹사이트는 모바일을 지원하지 않습니다.</h1>
        <p>걱정하지 마세요! LOTURA는 모바일에서도 사용할 수 있습니다.</p>
        <a
          href="https://play.google.com/store/apps/details?id=com.lotura.stac_flutter"
          target="_blank"
          rel="noopener noreferer nofollow"
        >
          <picture>
            <source type="image/svg+xml" srcSet={GoogleImg} />
            <img alt="구글 플레이 스토어" width="16" height="16" />
          </picture>
          Google Play
        </a>
      </Unavailable>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding-left: 10vw;
  padding-right: 10vw;

  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
`;

const Unavailable = styled.div`
  margin-top: 10vw;

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  h1 {
    width: 100%;

    color: ${({ theme }) => theme.colors.main1};
    font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
    font-size: ${({ theme }) => theme.fontSizes.subTitle};
  }

  p {
    width: 100%;

    color: ${({ theme }) => theme.colors.main2};
    font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
    font-size: ${({ theme }) => theme.fontSizes.text};
    font-weight: 300;
  }

  a {
    background-color: ${({ theme }) => theme.colors.main2};

    width: 160px;
    height: 48px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    color: ${({ theme }) => theme.colors.main4};
    font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
    font-size: ${({ theme }) => theme.fontSizes.text};
    font-weight: 300;

    border-radius: 8px;
  }
`;
