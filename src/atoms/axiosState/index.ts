import { atom } from "recoil";

export const AxiosStateAtom = atom<boolean>({
  key: "axiosState",
  default: false,
});
