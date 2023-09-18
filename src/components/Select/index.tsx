import { useState } from "react";
import { styled } from "styled-components";
import { preference } from "../../styles/theme";
import { DarkIcons, LightIcons } from "../../assets/images";

interface SelectProps {
  id: string;
  options: string[];
  value: string;
  setValue: (str: string) => void;
}

export const Select = ({ id, options, value, setValue }: SelectProps) => {
  const [collapseState, setCollapseState] = useState<boolean>(false);
  const isOptionsNotEmpty = options.length > 1;
  const ArrowImg = (
    preference === true ? LightIcons.ArrowImg : DarkIcons.ArrowImg
  ) as string;
  return isOptionsNotEmpty ? (
    <Wrapper
      expanded={`${collapseState}`}
      onClick={() => setCollapseState(!collapseState)}
    >
      <div>
        <p>{value}</p>
        <figure>
          <picture>
            <source type="image/svg+xml" srcSet={ArrowImg} />
            <img alt="" width="16" />
          </picture>
        </figure>
      </div>
      {collapseState && (
        <ul>
          {options.map((v, i) => (
            <li key={`${id}select${i}`}>
              <button type="button" onClick={() => setValue(v)}>
                {v}
              </button>
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  ) : (
    <></>
  );
};

interface WrapperProps {
  expanded: "true" | "false";
}

const Wrapper = styled.div<WrapperProps>`
  position: relative;

  margin-top: 4px;

  div {
    padding: 8px 12px;

    width: 100%;

    display: flex;
    align-items: center;

    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.main2};

    p {
      width: 100%;

      color: ${({ theme }) => theme.colors.main2};
      font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
      font-size: ${({ theme }) => theme.fontSizes.text};
      font-weight: 300;
    }

    figure picture img {
      ${(props) =>
        props.expanded === "true"
          ? "transform: rotate(0deg);"
          : "transform: rotate(180deg);"}
    }
  }

  ul {
    position: absolute;
    top: 48px;

    background-color: ${({ theme }) => theme.colors.main3};

    padding: 8px 0;

    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 8px;

    border: 1px solid ${({ theme }) => theme.colors.main2};

    ${({ theme }) => theme.commons.boxShadow}

    li {
      width: 100%;

      button {
        width: 100%;

        color: ${({ theme }) => theme.colors.main2};
        font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
        font-size: ${({ theme }) => theme.fontSizes.text};
        font-weight: 300;
      }
    }
  }
`;
