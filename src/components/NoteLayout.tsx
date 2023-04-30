import { Note } from "../modals/types";
import { Navigate, Outlet, useParams } from "react-router-dom";

type NoteLayoutProps = {
  notes: Note[];
};

function NoteLayout({ notes }: NoteLayoutProps): JSX.Element {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);

  if (!note) {
    return <Navigate to="/" replace={true} />;
  }
  return <Outlet context={note} />;
}

export default NoteLayout;
