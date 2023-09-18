import { DeviceMoveRequestType } from "../../../../types/device/move/request";
import { getCookie } from "../../../utils/cookie";
import { instance } from "../../../utils/instance";

export const deviceMove = async ({
  device_no,
  x_pos,
  y_pos,
}: DeviceMoveRequestType) =>
  await instance.post(
    "/move_device",
    {
      device_no: device_no,
      x_pos: x_pos,
      y_pos: y_pos,
    },
    {
      headers: { Authorization: `Bearer ${getCookie("accessToken")}` },
    }
  );
