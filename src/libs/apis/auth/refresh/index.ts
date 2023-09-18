import { AuthLoginResponseType } from "../../../../types/auth/login/response";
import { getCookie } from "../../../utils/cookie";
import { instance } from "../../../utils/instance";

export const authRefresh = async () =>
  await instance.post<AuthLoginResponseType>("/refresh", {
    refreshToken: getCookie("refreshToken"),
  });
