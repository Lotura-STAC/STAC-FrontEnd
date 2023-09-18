import { RadioType } from "../../../../components/Radio";

export interface AuthLoginResponseType {
  accessToken: string;
  refreshToken: string;
  role: RadioType;
}
