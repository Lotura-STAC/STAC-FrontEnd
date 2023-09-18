import { DeviceDeleteRequestType } from "../../../../types/device/delete/request";
import { getCookie } from "../../../utils/cookie";
import { instance } from "../../../utils/instance";

export const deviceDelete = async ({ device_no }: DeviceDeleteRequestType) =>
  await instance.post(
    "/remove_device",
    {
      device_no: device_no,
    },
    {
      headers: { Authorization: `Bearer ${getCookie("accessToken")}` },
    }
  );
