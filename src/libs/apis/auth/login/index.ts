import { AuthLoginRequestType } from "../../../../types/auth/login/request";
import { AuthLoginResponseType } from "../../../../types/auth/login/response";
import { instance } from "../../../utils/instance";

export const authLogin = async ({ id, pw }: AuthLoginRequestType) =>
  await instance.post<AuthLoginResponseType>("/login", {
    id: id,
    pw: pw,
  });
