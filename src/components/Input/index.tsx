import { styled } from "styled-components";
import { preference } from "../../styles/theme";

interface InputProps {
  id: string;
  type: "text" | "password";
  label: string;
  value: string;
  setValue: (str: string) => void;
}

export const Input = ({ id, type, label, value, setValue }: InputProps) => {
  return (
    <Wrapper preference={`${preference}`}>
      <label htmlFor={`${id}-input`}>{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        id={`${id}-input`}
        type={type}
      />
    </Wrapper>
  );
};

interface WrapperProps {
  preference: "true" | "false";
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    color: ${({ theme }) => theme.colors.main2};
    font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
    font-size: ${({ theme }) => theme.fontSizes.text};
  }

  input {
    padding: 8px 16px;

    width: 320px;
    height: 48px;

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
`;
