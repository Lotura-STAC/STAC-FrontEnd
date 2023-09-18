import { atom } from "recoil";

export interface HistoryType {
  device_no: string;
  x_pos: number;
  y_pos: number;
}

export interface HistoryStateAtomType {
  undo: HistoryType[];
  redo: HistoryType[];
}

export const HistoryStateAtom = atom<HistoryStateAtomType>({
  key: "historyState",
  default: { undo: [], redo: [] },
});
