import { useRecoilState, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { DeviceStateAtom, DeviceStateAtomType } from "../../atoms/deviceState";
import {
  HistoryStateAtom,
  HistoryStateAtomType,
  HistoryType,
} from "../../atoms/historyState";
import { DeviceItem } from "../DeviceItem";
import { deviceMove } from "../../libs/apis/device/move";
import { refreshToken } from "../../libs/utils/refreshToken";
import { Logout } from "../../libs/utils/logout";

export const Grid = () => {
  const [deviceState, setDeviceState] =
    useRecoilState<DeviceStateAtomType>(DeviceStateAtom);
  const setHistoryState =
    useSetRecoilState<HistoryStateAtomType>(HistoryStateAtom);
  return (
    <Wrapper id="parent">
      <ul>
        {deviceState.deviceResponses.length > 0 ? (
          deviceState.deviceResponses.map((v) => (
            <li key={`${v.device_no}`}>
              <DeviceItem
                curr_status={v.curr_status}
                device_no={v.device_no}
                device_type={v.device_type}
                name={v.name}
                x_pos={v.x_pos}
                y_pos={v.y_pos}
                clearRedoHistory={() =>
                  setHistoryState((prevState) => {
                    return { ...prevState, redo: [] };
                  })
                }
                setHistoryState={(newMove: HistoryType) =>
                  setHistoryState((prevState) => {
                    return { ...prevState, undo: [...prevState.undo, newMove] };
                  })
                }
                setDeviceState={(top: number, left: number) =>
                  setDeviceState((prevState) => {
                    deviceMove({
                      device_no: v.device_no,
                      x_pos: left,
                      y_pos: top,
                    }).catch(async () => {
                      const isRefreshed = await refreshToken();
                      if (isRefreshed)
                        deviceMove({
                          device_no: v.device_no,
                          x_pos: left,
                          y_pos: top,
                        }).catch(() =>
                          alert("알 수 없는 오류가 발생하였습니다.")
                        );
                      else {
                        alert("로그인 세션이 만료되었습니다.");
                        Logout();
                      }
                    });
                    return {
                      ...prevState,
                      deviceResponses: prevState.deviceResponses.map((map) =>
                        map.device_no === v.device_no
                          ? {
                              ...map,
                              x_pos: left,
                              y_pos: top,
                            }
                          : map
                      ),
                    };
                  })
                }
              />
            </li>
          ))
        ) : (
          <Suggest>
            <h2>아직 장치가 없습니다.</h2>
            <p>아래의 메뉴를 클릭하여 장치를 추가해보세요.</p>
          </Suggest>
        )}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  width: 100%;
  height: calc(100vh - 209px);

  display: flex;
  justify-content: center;

  border-radius: 8px;
  overflow: auto;

  ul {
    width: 80vw;
  }
`;

const Suggest = styled.div`
  margin-top: 48px;

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: ${({ theme }) => theme.colors.main1};
    font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
    font-size: ${({ theme }) => theme.fontSizes.subTitle};
  }

  p {
    margin-top: 24px;

    color: ${({ theme }) => theme.colors.main2};
    font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
    font-size: ${({ theme }) => theme.fontSizes.text};
    font-weight: 300;
  }
`;
