import { AuthWhoamiResponseType } from "../../../../types/auth/whoami/response";
import { getCookie } from "../../../utils/cookie";
import { instance } from "../../../utils/instance";

export const authWhoami = async () =>
  await instance.post<AuthWhoamiResponseType>(
    "/whoami",
    {},
    {
      headers: { Authorization: `Bearer ${getCookie("accessToken")}` },
    }
  );
