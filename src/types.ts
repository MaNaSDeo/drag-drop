import { Dispatch, SetStateAction } from "react";
export interface iNote {
  id: number;
  text: string;
  position?: iPosition;
}
export interface iNotesProps {
  notes: iNote[];
  setNotes: Dispatch<SetStateAction<iNote[]>>;
}
export interface iPosition {
  x: number;
  y: number;
}
