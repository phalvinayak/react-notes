import { Navigate, Route, Routes } from "react-router-dom";
import NoteList from "components/Pages/NoteList";
import NewNote from "components/Pages/NewNote";
import NoteLayout from "components/Pages/NoteLayout";
import SingleNote from "components/Pages/SingleNote";
import EditNote from "components/Pages/EditNote";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NoteList />} />
      <Route path="/new" element={<NewNote />} />
      <Route path="/:id" element={<NoteLayout />}>
        <Route index element={<SingleNote />} />
        <Route path="edit" element={<EditNote />} />
      </Route>
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
