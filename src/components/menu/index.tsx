import { useState } from "react";
import { styled } from "styled-components";
import { preference } from "../../styles/theme";
import { DarkIcons, LightIcons } from "../../assets/images";
import { MenuMain } from "./Main";
import { MenuCreateDevice } from "./Create";
import { MenuDeviceList } from "./List";

export type MenuType = "main" | "create" | "list";

export const Menu = () => {
  const [toggleState, setToggleState] = useState<boolean>(false);
  const [menuState, setMenuState] = useState<MenuType>("main");
  const MenuImg = (
    preference === true ? LightIcons.MenuImg : DarkIcons.MenuImg
  ) as string;
  return (
    <Wrapper toggle={`${toggleState}`}>
      {menuState === "main" && (
        <MenuMain setMenuState={(newPage: MenuType) => setMenuState(newPage)} />
      )}
      {menuState === "create" && (
        <MenuCreateDevice
          setMenuState={(newPage: MenuType) => setMenuState(newPage)}
        />
      )}
      {menuState === "list" && (
        <MenuDeviceList
          setMenuState={(newPage: MenuType) => setMenuState(newPage)}
        />
      )}
      <button type="button" onClick={() => setToggleState(!toggleState)}>
        <figure>
          <picture>
            <source type="image/svg+xml" srcSet={MenuImg} />
            <img alt="메뉴" width="24" height="24" />
          </picture>
        </figure>
        <p>{toggleState ? "접기" : "메뉴"}</p>
      </button>
    </Wrapper>
  );
};

interface WrapperProps {
  toggle: "true" | "false";
}

const Wrapper = styled.article<WrapperProps>`
  position: fixed;
  ${(props) => (props.toggle === "false" ? "left: -160px;" : "left: 0px;")}
  bottom: 209px;

  display: flex;
  align-items: flex-end;

  z-index: 89;

  transition: left 0.5s ease;

  > button {
    background-color: ${({ theme }) => theme.colors.main3};

    width: 60px;
    height: 80px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;

    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;

    figure {
      ${(props) =>
        props.toggle === "true" &&
        `picture {
        transform: rotate(180deg);
      }`}
    }

    p {
      color: ${({ theme }) => theme.colors.main1};
      font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
      font-size: ${({ theme }) => theme.fontSizes.text};
      font-weight: 300;
    }
  }

  button {
    transition: filter 0.25s ease;
  }

  button:enabled:hover {
    filter: brightness(115%);
  }
`;
