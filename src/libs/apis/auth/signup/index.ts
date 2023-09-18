import { AuthSignupRequestType } from "../../../../types/auth/signup/request";
import { instance } from "../../../utils/instance";

export const authSignup = async ({
  admin_id,
  admin_pw,
  guest_id,
  guest_pw,
}: AuthSignupRequestType) =>
  await instance.post("/sign", {
    admin_id: admin_id,
    admin_pw: admin_pw,
    guest_id: guest_id || undefined,
    guest_pw: guest_pw || undefined,
  });
