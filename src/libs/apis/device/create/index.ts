import { DeviceCreateRequestType } from "../../../../types/device/create/request";
import { getCookie } from "../../../utils/cookie";
import { instance } from "../../../utils/instance";
import { solveDeviceType } from "../../../utils/solveDeviceType";

export const deviceCreate = async ({
  name,
  device_no,
  device_type,
}: DeviceCreateRequestType) =>
  await instance.post(
    "/add_device",
    {
      name: name,
      device_no: device_no,
      device_type: solveDeviceType(device_type),
    },
    {
      headers: { Authorization: `Bearer ${getCookie("accessToken")}` },
    }
  );
