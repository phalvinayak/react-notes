import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";
import { RawNote, RawNoteData } from "application/modals/types";

type NotesType = {
  notes: RawNote[];
};

const initialState: NotesType = {
  notes: [],
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (
      state: NotesType,
      { payload }: PayloadAction<RawNoteData>
    ): void => {
      state.notes.push({ ...payload, id: uuidV4() });
    },
    deleteNote: (
      state: NotesType,
      { payload }: PayloadAction<string>
    ): void => {
      const index = state.notes.findIndex((note) => note.id === payload);
      if (index !== -1) {
        state.notes.splice(index, 1);
      }
    },
    updateNote: (
      state: NotesType,
      { payload }: PayloadAction<RawNote>
    ): void => {
      console.log("Update Note Slice", payload);
      const note = state.notes.find((note) => note.id === payload.id);
      if (note) {
        note.body = payload.body;
        note.tagIds = payload.tagIds;
        note.title = payload.title;
      }
    },
  },
});

export const { addNote, deleteNote, updateNote } = noteSlice.actions;
export default noteSlice.reducer;
