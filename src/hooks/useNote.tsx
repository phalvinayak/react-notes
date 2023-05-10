import { useOutletContext } from "react-router-dom";
import { Note } from "application/modals/types";

export default function useNote() {
  return useOutletContext<Note>();
}
