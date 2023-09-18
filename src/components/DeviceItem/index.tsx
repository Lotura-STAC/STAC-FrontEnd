import styled from "styled-components";
import { MachineIcons } from "../../assets/images";
import { DeviceType } from "../../types/device";
import { HistoryType } from "../../atoms/historyState";
import { useRef } from "react";
import { isElementInViewport } from "../../libs/utils/isElementInViewport";
import { useRecoilValue } from "recoil";
import { RadioType } from "../Radio";
import { LoginStateAtom } from "../../atoms/loginState";

interface DeviceItemProps {
  clearRedoHistory: () => void;
  setHistoryState: (newMove: HistoryType) => void;
  setDeviceState: (top: number, left: number) => void;
}

export const DeviceItem = ({
  curr_status,
  device_no,
  device_type,
  name,
  x_pos,
  y_pos,
  clearRedoHistory,
  setHistoryState,
  setDeviceState,
}: DeviceType & DeviceItemProps) => {
  const loginState = useRecoilValue<RadioType>(LoginStateAtom);
  const articleRef = useRef<HTMLElement>(null);
  const isRunning = curr_status === 0;
  const icon = isRunning
    ? device_type === "DRY"
      ? MachineIcons.RedTumbleDryerImg
      : MachineIcons.RedWashingMachineImg
    : device_type === "DRY"
    ? MachineIcons.GreenTumbleDryerImg
    : MachineIcons.GreenWashingMachineImg;
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  let startX = 0,
    startY = 0;
  const startDrag = (e: React.MouseEvent<HTMLElement>) => {
    if (loginState === "admin") {
      clearRedoHistory();
      const target = e.currentTarget;
      target.style.cursor = "grabbing";
      pos3 = e.clientX;
      pos4 = e.clientY;
      startX = parseInt(target.style.left.replace("px", ""));
      startY = parseInt(target.style.top.replace("px", ""));
      document.onmouseup = endDrag;
      document.onmousemove = whileDrag;
    }
  };
  const whileDrag = (e: MouseEvent) => {
    if (loginState === "admin") {
      const target = articleRef.current!;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      target.style.top = target.offsetTop - pos2 + "px";
      target.style.left = target.offsetLeft - pos1 + "px";
    }
  };
  const endDrag = () => {
    if (loginState === "admin") {
      const target = articleRef.current!;
      target.style.cursor = "grab";
      document.onmouseup = null;
      document.onmousemove = null;
      if (isElementInViewport(target)) {
        const top = parseInt(target.style.top.replace("px", ""));
        const left = parseInt(target.style.left.replace("px", ""));
        if (top !== startY || left !== startX)
          setHistoryState({
            device_no: device_no,
            x_pos: startX,
            y_pos: startY,
          });
        setDeviceState(top, left);
      } else {
        target.style.top = startY + "px";
        target.style.left = startX + "px";
      }
    }
  };
  return (
    <Wrapper
      title={`${name} (@${device_no})`}
      role={loginState}
      draggable
      onMouseDown={(e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (loginState === "admin" && articleRef.current) startDrag(e);
      }}
      ref={articleRef}
      style={{
        top: `${y_pos}px`,
        left: `${x_pos}px`,
      }}
    >
      <h2>{name}</h2>
      <figure>
        <Icon curr_status={curr_status}>
          <source type="image/svg+xml" srcSet={icon} />
          <img
            alt={device_type === "DRY" ? "건조기" : "세탁기"}
            width="96"
            height="96"
          />
        </Icon>
      </figure>
      <p>{`${isRunning ? "작동중" : "쉬는중"}`}</p>
    </Wrapper>
  );
};

interface WrapperProps {
  role: RadioType;
}

const Wrapper = styled.article<WrapperProps>`
  position: absolute;
  top: 0;
  left: 0;

  background-color: ${({ theme }) => theme.colors.main2};

  width: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.role === "admin" ? "cursor: grab;" : "cursor: not-allowed;"}

  ${({ theme }) => theme.commons.boxShadow}

  h2 {
    width: 100%;

    color: ${({ theme }) => theme.colors.main3};
    font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
    font-size: ${({ theme }) => theme.fontSizes.text};
    text-align: center;

    ${({ theme }) => theme.commons.ellipsis}
  }

  p {
    color: ${({ theme }) => theme.colors.main4};
    font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
    font-size: ${({ theme }) => theme.fontSizes.text};
    font-weight: 300;
  }
`;

interface IconProps {
  curr_status: number;
}

const Icon = styled.picture<IconProps>`
  ${(props) =>
    props.curr_status === 1
      ? `filter: drop-shadow(0 0 2px ${props.theme.colors.success})`
      : `filter: drop-shadow(0 0 2px ${props.theme.colors.error})`}
`;
