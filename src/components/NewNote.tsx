import React from "react";
import NoteForm from "./NoteForm";
import { NoteData, Tag } from "../modals/types";

type NewNotesProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  availableTags: Tag[];
};

const NewNote = ({ onSubmit, onAddTag, availableTags }: NewNotesProps) => {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
};

export default NewNote;
