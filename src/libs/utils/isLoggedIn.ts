import { getCookie } from "./cookie";

export const isLoggedIn = getCookie("accessToken") !== undefined;
