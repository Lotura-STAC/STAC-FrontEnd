import { useState } from "react";
import { styled } from "styled-components";
import { preference } from "../../../../styles/theme";
import { DarkIcons, LightIcons } from "../../../../assets/images";

interface MenuDeviceListItemProps {
  name: string;
  device_no: string;
  changeName: (newName: string) => void;
  removeDevice: () => void;
}

export const MenuDeviceListItem = ({
  name,
  device_no,
  changeName,
  removeDevice,
}: MenuDeviceListItemProps) => {
  const [editState, setEditState] = useState<boolean>(false);
  const [removeState, setRemoveState] = useState<boolean>(false);
  const [inputState, setInputState] = useState<string>(name);
  const PenImg = (
    preference === true ? DarkIcons.PenImg : LightIcons.PenImg
  ) as string;
  const TrashImg = (
    preference === true ? DarkIcons.TrashImg : LightIcons.TrashImg
  ) as string;
  const CheckImg = (
    preference === true ? DarkIcons.CheckImg : LightIcons.CheckImg
  ) as string;
  const CloseImg = (
    preference === true ? DarkIcons.CloseImg : LightIcons.CloseImg
  ) as string;
  const validateForm = (): boolean => {
    if (inputState === "") return false;
    return true;
  };
  return (
    <Wrapper
      title={`${name} (@${device_no})`}
      confirm={`${editState || removeState}`}
    >
      {editState ? (
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (validateForm()) {
              changeName(inputState);
              setEditState(false);
            }
          }}
        >
          <input
            autoFocus
            value={inputState}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputState(e.currentTarget.value)
            }
          />
        </form>
      ) : (
        <p>{name}</p>
      )}
      {editState || removeState ? (
        <div>
          <button
            type="button"
            aria-label="확인"
            onClick={() => {
              if (editState) changeName(inputState);
              if (removeState) removeDevice();
              setEditState(false);
              setRemoveState(false);
            }}
          >
            <figure>
              <picture>
                <source type="image/svg+xml" srcSet={CheckImg} />
                <img alt="" width="10" height="10" />
              </picture>
            </figure>
          </button>
          <button
            type="button"
            aria-label="취소"
            onClick={() => {
              setEditState(false);
              setRemoveState(false);
            }}
          >
            <figure>
              <picture>
                <source type="image/svg+xml" srcSet={CloseImg} />
                <img alt="" width="10" height="10" />
              </picture>
            </figure>
          </button>
        </div>
      ) : (
        <div>
          <button
            type="button"
            aria-label="이름 변경"
            onClick={() => setEditState(true)}
          >
            <figure>
              <picture>
                <source type="image/svg+xml" srcSet={PenImg} />
                <img alt="" width="10" height="10" />
              </picture>
            </figure>
          </button>
          <button
            type="button"
            aria-label="삭제"
            onClick={() => setRemoveState(true)}
          >
            <figure>
              <picture>
                <source type="image/svg+xml" srcSet={TrashImg} />
                <img alt="" width="16" />
              </picture>
            </figure>
          </button>
        </div>
      )}
    </Wrapper>
  );
};

interface WrapperProps {
  confirm: "true" | "false";
}

const Wrapper = styled.li<WrapperProps>`
  background-color: ${({ theme }) => theme.colors.main2};

  padding: 8px 16px;

  width: 100%;
  height: 36px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: default;
  border-radius: 8px;
  transition: filter 0.25s ease;

  form input,
  p {
    width: 100%;

    color: ${({ theme }) => theme.colors.main4};
    font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
    font-size: ${({ theme }) => theme.fontSizes.text};
    font-weight: 300;
  }

  form input {
    width: calc(100% - 8px);

    border-bottom: 1px solid ${({ theme }) => theme.colors.main4};
  }

  form input:focus {
    outline: none;
  }

  p {
    margin-right: 8px;

    ${({ theme }) => theme.commons.ellipsis}
  }

  div {
    display: flex;
    gap: 8px;

    ${(props) =>
      props.confirm === "false" &&
      `transform: translateX(3px);
    gap: 5px;`}
  }
`;
