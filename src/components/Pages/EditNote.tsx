import NoteForm from "components/Notes/NoteForm";
import useNote from "hooks/useNote";

const EditNote = () => {
  const note = useNote();
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm title={note.title} body={note.body} tags={note.tags} />
    </>
  );
};

export default EditNote;
