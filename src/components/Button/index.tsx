import { Link } from "react-router-dom";
import { styled } from "styled-components";

interface ButtonProps {
  label: string;
  width: number;
  color: "colored" | "uncolored";
  type: "button" | "submit" | "a";
  to?: string;
  onClick?: () => void;
}

export const Button = ({
  label,
  width,
  color,
  type,
  to,
  onClick,
}: ButtonProps) => {
  return (
    <>
      {type === "button" ||
        (type === "submit" && (
          <Wrapper
            width={width}
            color={color}
            type={type}
            onClick={onClick && onClick}
          >
            {label}
          </Wrapper>
        ))}
      {type === "a" && (
        <Anchor
          to={to || ""}
          width={width}
          color={color}
          type={onClick ? "button" : "submit"}
          onClick={onClick && onClick}
        >
          {label}
        </Anchor>
      )}
    </>
  );
};

interface WrapperProps {
  width: number;
  color: "colored" | "uncolored";
}

const Wrapper = styled.button<WrapperProps>`
  width: ${(props) => `${props.width}px`};
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  transition: filter 0.25s ease;

  ${({ theme, color }) =>
    color === "colored" &&
    `background-color: ${theme.colors.main2};

  color: ${theme.colors.main4};
  font-family: ${theme.fontFamily.spoqaLight};
  font-size: ${theme.fontSizes.text};
  font-weight: 300;`}

  ${({ theme, color }) =>
    color === "uncolored" &&
    `color: ${theme.colors.main2};
  font-family: ${theme.fontFamily.spoqaLight};
  font-size: ${theme.fontSizes.text};
  font-weight: 300;

  border: 1px solid ${theme.colors.main2};`}
   
  :hover {
    filter: brightness(115%);
  }
`;

interface AnchorProps {
  width: number;
  color: "colored" | "uncolored";
}

const Anchor = styled(Link)<AnchorProps>`
  width: ${(props) => `${props.width}px`};
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  transition: filter 0.25s ease;

  ${({ theme, color }) =>
    color === "colored" &&
    `background-color: ${theme.colors.main2};

  color: ${theme.colors.main4};
  font-family: ${theme.fontFamily.spoqaLight};
  font-size: ${theme.fontSizes.text};
  font-weight: 300;`}

  ${({ theme, color }) =>
    color === "uncolored" &&
    `color: ${theme.colors.main2};
  font-family: ${theme.fontFamily.spoqaLight};
  font-size: ${theme.fontSizes.text};
  font-weight: 300;

  border: 1px solid ${theme.colors.main2};`}
   
  :hover {
    filter: brightness(115%);
  }
`;
