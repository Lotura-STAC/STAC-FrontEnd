import { atom } from "recoil";
import { RadioType } from "../../components/Radio";

export const LoginStateAtom = atom<RadioType>({
  key: "loginState",
  default: "guest",
});
