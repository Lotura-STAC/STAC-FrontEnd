import { styled } from "styled-components";
import { DarkIcons, LightIcons } from "../../../assets/images";
import { preference } from "../../../styles/theme";
import { MenuType } from "..";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  DeviceStateAtom,
  DeviceStateAtomType,
} from "../../../atoms/deviceState";
import { MenuDeviceListItem } from "./Item";
import { deviceDelete } from "../../../libs/apis/device/delete";
import { deviceRename } from "../../../libs/apis/device/rename";
import { refreshToken } from "../../../libs/utils/refreshToken";
import { Logout } from "../../../libs/utils/logout";

interface MenuMainProps {
  setMenuState: (newPage: MenuType) => void;
}

export const MenuDeviceList = ({ setMenuState }: MenuMainProps) => {
  const [deviceState, setDeviceState] =
    useRecoilState<DeviceStateAtomType>(DeviceStateAtom);
  const [inputState, setInputState] = useState<string>("");
  const SearchImg = (
    preference === true ? LightIcons.SearchImg : DarkIcons.SearchImg
  ) as string;
  return (
    <Wrapper>
      <Title>
        <button
          type="button"
          aria-label="뒤로 가기"
          onClick={() => setMenuState("main")}
        >
          ←
        </button>
        목록
      </Title>
      <label>
        <figure>
          <picture>
            <source type="image/svg+xml" srcSet={SearchImg} />
            <img alt="" width="16" height="16" />
          </picture>
        </figure>
        <input
          autoFocus
          placeholder="장치 검색..."
          value={inputState}
          onChange={(e) => setInputState(e.currentTarget.value)}
        />
      </label>
      <List>
        {deviceState.deviceResponses
          .filter(
            (v) =>
              v.name.toLowerCase().includes(inputState.toLowerCase()) ||
              v.device_no.toLowerCase().includes(inputState.toLowerCase())
          )
          .map((v) => (
            <MenuDeviceListItem
              key={v.device_no}
              name={v.name}
              device_no={v.device_no}
              changeName={(newName: string) =>
                setDeviceState((prevState) => {
                  deviceRename({ device_no: v.device_no, name: newName }).catch(
                    async () => {
                      const isRefreshed = await refreshToken();
                      if (isRefreshed)
                        deviceRename({
                          device_no: v.device_no,
                          name: newName,
                        }).catch(() =>
                          alert("알 수 없는 오류가 발생하였습니다.")
                        );
                      else {
                        alert("로그인 세션이 만료되었습니다.");
                        Logout();
                      }
                    }
                  );
                  return {
                    ...prevState,
                    deviceResponses: prevState.deviceResponses.map((map) =>
                      map.device_no === v.device_no
                        ? {
                            ...map,
                            name: newName,
                          }
                        : map
                    ),
                  };
                })
              }
              removeDevice={() =>
                setDeviceState((prevState) => {
                  deviceDelete({ device_no: v.device_no }).catch(async () => {
                    const isRefreshed = await refreshToken();
                    if (isRefreshed)
                      deviceDelete({ device_no: v.device_no }).catch(() => {
                        alert("로그인 세션이 만료되었습니다.");
                        Logout();
                      });
                  });
                  return {
                    ...prevState,
                    deviceResponses: prevState.deviceResponses.filter(
                      (filter) => filter.device_no !== v.device_no
                    ),
                  };
                })
              }
            />
          ))}
      </List>
    </Wrapper>
  );
};

const Title = styled.h2`
  position: relative;

  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.main1};
  font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
  font-size: ${({ theme }) => theme.fontSizes.subTitle};

  button {
    position: absolute;
    left: 0;

    color: ${({ theme }) => theme.colors.main2};
    font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
    font-size: ${({ theme }) => theme.fontSizes.text};
    font-weight: 300;
  }
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.main3};

  padding: 8px 16px;

  width: 160px;
  height: 325px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  border-top-right-radius: 8px;

  label {
    padding: 8px 12px;

    width: 100%;
    height: 36px;

    display: flex;

    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.main2};

    input {
      margin-left: 8px;

      width: 100%;

      color: ${({ theme }) => theme.colors.main2};
      font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
      font-size: ${({ theme }) => theme.fontSizes.text};
      font-weight: 300;
    }

    input::placeholder {
      color: ${({ theme }) => theme.colors.background5};
      font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
      font-size: ${({ theme }) => theme.fontSizes.text};
      font-weight: 300;
    }

    input:focus {
      outline: none;
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.background5};
    border-left: 4px solid ${({ theme }) => theme.colors.main3};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.background4};
  }
`;

const List = styled.ul`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;

  overflow-y: auto;
`;
