import { styled } from "styled-components";

interface HomeArticleProps {
  title: string;
  subTitle: string;
  image: string;
  direction: "ltr" | "rtl";
}

export const HomeArticle = ({
  title,
  subTitle,
  image,
  direction,
}: HomeArticleProps) => {
  return (
    <Wrapper>
      {direction === "rtl" && (
        <div>
          <h2>{`"${title}"`}</h2>
          <p>{subTitle}</p>
        </div>
      )}
      <figure>
        <picture>
          <source type="image/svg+xml" srcSet={image} />
          <img alt="" width="256" height="256" />
        </picture>
      </figure>
      {direction === "ltr" && (
        <div>
          <h2>{`"${title}"`}</h2>
          <p>{subTitle}</p>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.article`
  margin-top: 48px;

  display: flex;
  gap: 5vw;

  figure picture img {
    border-radius: 8px;
  }

  div {
    width: calc(100vw - 256px - 25vw);

    h2 {
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
  }
`;
