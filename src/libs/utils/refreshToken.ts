import { authRefresh } from "../apis/auth/refresh";
import { setCookie } from "./cookie";

export const refreshToken = async (): Promise<boolean> => {
  return await authRefresh()
    .then((response) => {
      setCookie("accessToken", response.data.accessToken, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      setCookie("refreshToken", response.data.refreshToken, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      return true;
    })
    .catch(() => {
      return false;
    });
};
