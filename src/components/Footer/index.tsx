import { styled } from "styled-components";
import { DarkIcons, LightIcons } from "../../assets/images";
import { preference } from "../../styles/theme";

interface FooterProps {
  status?: "loading" | "connected" | "disconnected";
  uptime?: string;
}

export const Footer = ({ status, uptime }: FooterProps) => {
  const LogoImg = (
    preference === true ? LightIcons.LogoImg : DarkIcons.LogoImg
  ) as string;
  const FacebookImg = (
    preference === true ? LightIcons.FacebookImg : DarkIcons.FacebookImg
  ) as string;
  const GithubImg = (
    preference === true ? LightIcons.GithubImg : DarkIcons.GithubImg
  ) as string;
  return (
    <Wrapper>
      <Head>
        <h1>
          <figure>
            <picture>
              <source type="image/svg+xml" srcSet={LogoImg} />
              <img alt="로고" width="20" height="20" />
            </picture>
          </figure>
          LOTURA
        </h1>
        <div>
          <a
            href="https://www.facebook.com/DSMNonamed"
            target="_blank"
            rel="noopener noreferer nofollow"
          >
            <picture>
              <source type="image/svg+xml" srcSet={FacebookImg} />
              <img alt="페이스북" width="16" height="16" />
            </picture>
          </a>
          <a
            href="https://github.com/Lotura-STAC"
            target="_blank"
            rel="noopener noreferer nofollow"
          >
            <picture>
              <source type="image/svg+xml" srcSet={GithubImg} />
              <img alt="깃허브" width="16" height="16" />
            </picture>
          </a>
        </div>
      </Head>
      <Body>
        <ul>
          <li>
            <h2>Embedded</h2>
            <a
              href="https://github.com/phoenix9469"
              target="_blank"
              rel="noopener noreferer nofollow"
            >
              phoenix9469
            </a>
            <a
              href="https://github.com/wksoskwl"
              target="_blank"
              rel="noopener noreferer nofollow"
            >
              wksoskwl
            </a>
          </li>
          <li>
            <h2>Flutter</h2>
            <a
              href="https://github.com/Yoochanhong"
              target="_blank"
              rel="noopener noreferer nofollow"
            >
              Yoochanhong
            </a>
          </li>
          <li>
            <h2>Front-End</h2>
            <a
              href="https://github.com/izzysden"
              target="_blank"
              rel="noopener noreferer nofollow"
            >
              izzysden
            </a>
          </li>
          <li>
            <h2>Back-End</h2>
            <a
              href="https://github.com/phoenix9469"
              target="_blank"
              rel="noopener noreferer nofollow"
            >
              phoenix9469
            </a>
          </li>
        </ul>
        <p>
          <Dot status={status} />
          {uptime}
          <span>{status}</span>
        </p>
      </Body>
      <Foot>ⓒ 2023. Lotura all rights reserved.</Foot>
    </Wrapper>
  );
};

interface DotProps {
  status?: "loading" | "connected" | "disconnected";
}

const Dot = styled.strong<DotProps>`
  background-color: ${(props) =>
    props.status === "connected"
      ? props.theme.colors.success
      : props.status === "disconnected"
      ? props.theme.colors.error
      : props.status === "loading" && props.theme.colors.background4};

  width: 8px;
  height: 8px;

  border-radius: 50%;
`;

const Wrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.main3};

  padding: 8px 10vw;

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Head = styled.div`
  position: relative;

  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  h1,
  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  h1 {
    display: flex;
    align-items: center;
    gap: 8px;

    color: ${({ theme }) => theme.colors.main1};
    font-family: ${({ theme }) => theme.fontFamily.gothamLight};
    font-size: ${({ theme }) => theme.fontSizes.subTitle};
    font-weight: 300;
  }
`;

const Body = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  p {
    height: 100%;

    display: flex;
    align-items: center;
    gap: 8px;

    color: ${({ theme }) => theme.colors.main2};
    font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
    font-size: ${({ theme }) => theme.fontSizes.text};
    font-weight: 300;
  }

  span {
    display: flex;

    color: ${({ theme }) => theme.colors.main2};
    font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
    font-size: ${({ theme }) => theme.fontSizes.text};
    font-weight: 300;
  }

  ul {
    display: flex;
    gap: 16px;

    li {
      display: flex;
      flex-direction: column;

      h2 {
        color: ${({ theme }) => theme.colors.main2};
        font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
        font-size: ${({ theme }) => theme.fontSizes.text};
      }

      a {
        height: 24px;

        color: ${({ theme }) => theme.colors.main2};
        font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
        font-size: ${({ theme }) => theme.fontSizes.text};
        font-weight: 300;

        transition: filter 0.25s ease;
      }

      a:hover {
        filter: drop-shadow(0 0 2px ${({ theme }) => theme.colors.main2});
        border-bottom: 1px solid ${({ theme }) => theme.colors.main2};
      }
    }
  }
`;

const Foot = styled.p`
  color: ${({ theme }) => theme.colors.main2};
  font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
  font-size: ${({ theme }) => theme.fontSizes.text};
  font-weight: 300;
`;
