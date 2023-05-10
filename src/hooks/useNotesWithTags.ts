import { useMemo } from "react";
import { Note } from "application/modals/types";
import { RootState } from "application/redux/store";
import { useSelector } from "react-redux";

export function useNotesWithTags(): Note[] {
  const { notes, tags } = useSelector((store: RootState) => ({
    notes: store.note.notes,
    tags: store.tag.tags,
  }));
  const notesWithTags: Note[] = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => {
          return note.tagIds.includes(tag.id);
        }),
      };
    });
  }, [notes, tags]);

  return notesWithTags;
}
