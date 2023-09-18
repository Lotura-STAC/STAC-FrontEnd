import { styled } from "styled-components";

interface BannerProps {
  children?: JSX.Element | JSX.Element[];
}

export const Banner = ({ children }: BannerProps) => {
  return (
    <Wrapper>
      <Title>
        <h1>LOTURA</h1>
        <span aria-hidden>LOTURA</span>
      </Title>
      <p>세탁기와 건조기를 온라인에서 확인할 수 있는 서비스입니다.</p>
      {children && <div>{children}</div>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.main3};

  padding-top: 48px;
  padding-bottom: 48px;

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: ${({ theme }) => theme.colors.main2};
    font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
    font-size: ${({ theme }) => theme.fontSizes.subTitle};
  }

  > div:last-of-type {
    margin-top: 16px;

    display: flex;
    gap: 24px;
  }
`;

const Title = styled.div`
  position: relative;

  h1 {
    position: relative;

    color: ${({ theme }) => theme.colors.main1};
    font-family: ${({ theme }) => theme.fontFamily.gothamBold};
    font-size: ${({ theme }) => theme.fontSizes.title};

    z-index: 2;
  }

  span {
    position: absolute;
    top: 0;
    left: 4px;

    color: transparent;
    font-family: ${({ theme }) => theme.fontFamily.gothamBold};
    font-size: ${({ theme }) => theme.fontSizes.title};
    -webkit-text-stroke: 1px ${({ theme }) => theme.colors.main2};

    pointer-events: none;
    z-index: 1;
  }
`;
