import React from "react";
import NoteForm from "./NoteForm";
import { NoteData, Tag } from "../modals/types";
import useNote from "../hooks/useNote";

type EditNotesProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  availableTags: Tag[];
};

const EditNote = ({ onSubmit, onAddTag, availableTags }: EditNotesProps) => {
  const note = useNote();
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        title={note.title}
        body={note.body}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
};

export default EditNote;
