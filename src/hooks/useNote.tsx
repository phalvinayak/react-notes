import { useOutletContext } from "react-router-dom";
import { Note } from "../modals/types";

export default function useNote() {
  return useOutletContext<Note>();
}
