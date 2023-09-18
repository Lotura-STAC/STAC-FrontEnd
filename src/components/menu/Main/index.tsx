import { styled } from "styled-components";
import { MenuType } from "..";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  HistoryStateAtom,
  HistoryStateAtomType,
} from "../../../atoms/historyState";
import {
  DeviceStateAtom,
  DeviceStateAtomType,
} from "../../../atoms/deviceState";
import { preference } from "../../../styles/theme";
import { DarkIcons, LightIcons } from "../../../assets/images";
import { DeviceType } from "../../../types/device";
import { deviceMove } from "../../../libs/apis/device/move";
import { refreshToken } from "../../../libs/utils/refreshToken";
import { Logout } from "../../../libs/utils/logout";

interface MenuMainProps {
  setMenuState: (newPage: MenuType) => void;
}

export const MenuMain = ({ setMenuState }: MenuMainProps) => {
  const [historyState, setHistoryState] =
    useRecoilState<HistoryStateAtomType>(HistoryStateAtom);
  const setDeviceState =
    useSetRecoilState<DeviceStateAtomType>(DeviceStateAtom);
  const UndoImg = (
    preference === true ? LightIcons.UndoImg : DarkIcons.UndoImg
  ) as string;
  const RedoImg = (
    preference === true ? LightIcons.RedoImg : DarkIcons.RedoImg
  ) as string;
  const AddListImg = (
    preference === true ? LightIcons.AddListImg : DarkIcons.AddListImg
  ) as string;
  const ListImg = (
    preference === true ? LightIcons.ListImg : DarkIcons.ListImg
  ) as string;
  const undoAction = () => {
    const clonedArr = [...historyState.undo];
    const action = clonedArr.pop()!;
    let target: DeviceType;
    setDeviceState((prevState) => {
      return {
        ...prevState,
        deviceResponses: prevState.deviceResponses.map((v) => {
          if (v.device_no === action.device_no) {
            deviceMove({
              device_no: v.device_no,
              x_pos: action.x_pos,
              y_pos: action.y_pos,
            }).catch(async () => {
              const isRefreshed = await refreshToken();
              if (isRefreshed)
                deviceMove({
                  device_no: v.device_no,
                  x_pos: action.x_pos,
                  y_pos: action.y_pos,
                }).catch(() => {
                  alert("로그인 세션이 만료되었습니다.");
                  Logout();
                });
            });
            target = v;
            return {
              ...v,
              x_pos: action.x_pos,
              y_pos: action.y_pos,
            };
          } else return v;
        }),
      };
    });
    setHistoryState((prevState) => {
      return {
        undo: clonedArr,
        redo: [...prevState.redo, target],
      };
    });
  };
  const redoAction = () => {
    const clonedArr = [...historyState.redo];
    const action = clonedArr.pop()!;
    let target: DeviceType;
    setDeviceState((prevState) => {
      return {
        ...prevState,
        deviceResponses: prevState.deviceResponses.map((v) => {
          if (v.device_no === action.device_no) {
            deviceMove({
              device_no: v.device_no,
              x_pos: action.x_pos,
              y_pos: action.y_pos,
            }).catch(async () => {
              const isRefreshed = await refreshToken();
              if (isRefreshed)
                deviceMove({
                  device_no: v.device_no,
                  x_pos: action.x_pos,
                  y_pos: action.y_pos,
                }).catch(() => alert("알 수 없는 오류가 발생하였습니다."));
              else {
                alert("로그인 세션이 만료되었습니다.");
                Logout();
              }
            });
            target = v;
            return {
              ...v,
              x_pos: action.x_pos,
              y_pos: action.y_pos,
            };
          } else return v;
        }),
      };
    });
    setHistoryState((prevState) => {
      return {
        undo: [...prevState.undo, target],
        redo: clonedArr,
      };
    });
  };
  return (
    <Wrapper>
      <h2>메뉴</h2>
      <p>장치를 드래그하여 위치를 바꿀 수 있습니다.</p>
      <div>
        <button
          type="button"
          disabled={historyState.undo.length === 0}
          onClick={() => undoAction()}
        >
          <figure>
            <picture>
              <source type="image/svg+xml" srcSet={UndoImg} />
              <img alt="" width="16" />
            </picture>
          </figure>
          취소
        </button>
        <button
          type="button"
          disabled={historyState.redo.length === 0}
          onClick={() => redoAction()}
        >
          <figure>
            <picture>
              <source type="image/svg+xml" srcSet={RedoImg} />
              <img alt="" width="16" />
            </picture>
          </figure>
          번복
        </button>
      </div>
      <button type="button" onClick={() => setMenuState("create")}>
        <figure>
          <picture>
            <source type="image/svg+xml" srcSet={AddListImg} />
            <img alt="" width="16" />
          </picture>
        </figure>
        장치 등록
      </button>
      <button type="button" onClick={() => setMenuState("list")}>
        <figure>
          <picture>
            <source type="image/svg+xml" srcSet={ListImg} />
            <img alt="" width="16" />
          </picture>
        </figure>
        장치 목록
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.main3};

  padding: 8px 16px;

  width: 160px;
  height: 325px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  border-top-right-radius: 8px;

  > p {
    width: 100%;

    color: ${({ theme }) => theme.colors.main2};
    font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
    font-size: ${({ theme }) => theme.fontSizes.subText};
    font-weight: 300;
  }

  div,
  > h2,
  > button {
    width: 100%;
    height: 36px;
  }

  div,
  > h2,
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  h2 {
    color: ${({ theme }) => theme.colors.main1};
    font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
    font-size: ${({ theme }) => theme.fontSizes.subTitle};
  }

  button {
    color: ${({ theme }) => theme.colors.main2};
    font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
    font-size: ${({ theme }) => theme.fontSizes.text};
  }

  button:disabled {
    filter: brightness(70%);
    cursor: default;
  }
`;
