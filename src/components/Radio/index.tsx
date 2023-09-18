import { styled } from "styled-components";

export type RadioType = "admin" | "guest";

interface RadioProps {
  value: RadioType;
  setValue: (newType: RadioType) => void;
}

export const Radio = ({ value, setValue }: RadioProps) => {
  return (
    <Wrapper>
      <input
        title="개인"
        type="radio"
        id="admin"
        name="radio-type"
        value="admin"
        defaultChecked
      />
      <label
        id={value === "admin" ? "radio-selected" : ""}
        htmlFor="admin"
        onClick={() => setValue("admin")}
      >
        관리자
      </label>
      <input
        title="단체"
        type="radio"
        id="guest"
        name="radio-type"
        value="guest"
      />
      <label
        id={value === "guest" ? "radio-selected" : ""}
        htmlFor="guest"
        onClick={() => setValue("guest")}
      >
        사용자
      </label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 8px;

  width: 320px;
  height: 48px;

  display: flex;

  label {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme.colors.main2};
    font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
    font-size: ${({ theme }) => theme.fontSizes.text};

    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.colors.main2};
    transition: background-color 0.25s ease, color 0.25s ease;
  }

  label:first-of-type {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  label:last-of-type {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  #radio-selected {
    background-color: ${({ theme }) => theme.colors.main2};

    color: ${({ theme }) => theme.colors.main4};
  }

  input {
    display: none;
  }
`;
