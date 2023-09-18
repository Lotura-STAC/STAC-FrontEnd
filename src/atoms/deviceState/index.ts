import { atom } from "recoil";
import { DeviceType } from "../../types/device";
import { StatusType } from "../../hooks/useSocket";

export interface DeviceStateAtomType {
  deviceResponses: DeviceType[];
  status: StatusType;
  uptime: string;
}

export const DeviceStateAtom = atom<DeviceStateAtomType>({
  key: "deviceState",
  default: {
    deviceResponses: [],
    status: "disconnected",
    uptime: "",
  },
});
