import { Navigate, Outlet, useParams } from "react-router-dom";
import { useNotesWithTags } from "hooks/useNotesWithTags";

function NoteLayout(): JSX.Element {
  const notes = useNotesWithTags();
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);

  if (!note) {
    return <Navigate to="/" replace={true} />;
  }
  return <Outlet context={note} />;
}

export default NoteLayout;
