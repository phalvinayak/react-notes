import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import NewNote from "./components/NewNote";
import { Note, NoteData, RawNote, RawNoteData, Tag } from "./modals/types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { isNotEmittedStatement } from "typescript";
import NoteList from "./components/NoteList";
import NoteLayout from "./components/NoteLayout";
import SingleNote from "./components/SingleNote";
import EditNote from "./components/EditNote";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

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

  function onAddTag(tag: Tag): void {
    setTags((prevTags) => [...prevTags, tag]);
  }

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes: RawNote[]) => {
      return [
        ...prevNotes,
        { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        }
        return note;
      });
    });
  }

  function onDeleteNote(id: string): void {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  function updateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        }
        return tag;
      });
    });
  }

  function deleteTag(id: string) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              availableTags={tags}
              notes={notesWithTags}
              updateTag={updateTag}
              deleteTag={deleteTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={onAddTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<SingleNote onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={onAddTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
