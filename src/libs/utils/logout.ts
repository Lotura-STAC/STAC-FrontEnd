import { deleteCookie } from "./cookie";

export const Logout = () => {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  window.location.replace("/");
};
