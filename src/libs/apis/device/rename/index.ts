import { DeviceRenameRequestType } from "../../../../types/device/rename/request";
import { getCookie } from "../../../utils/cookie";
import { instance } from "../../../utils/instance";

export const deviceRename = async ({
  device_no,
  name,
}: DeviceRenameRequestType) =>
  await instance.post(
    "/rename_device",
    {
      device_no: device_no,
      new_name: name,
    },
    {
      headers: { Authorization: `Bearer ${getCookie("accessToken")}` },
    }
  );
