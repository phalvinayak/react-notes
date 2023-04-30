import { useState, useMemo, ChangeEvent } from "react";
import { Form, Button, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { MultiValue } from "react-select/dist/declarations/src";
import { Note, ReactSelectType, Tag } from "../modals/types";
import NoteCard from "./NoteCard";
import EditTagsModal from "./Tags/EditTagsModal";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};

const NoteList = ({
  availableTags,
  notes,
  updateTag,
  deleteTag,
}: NoteListProps) => {
  const [selectedTags, setSeletedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [showEditTagModal, setShowEditTagModal] = useState(false);

  const tagsValue: ReactSelectType[] = selectedTags.map(
    (tag: Tag): ReactSelectType => {
      return { label: tag.label, value: tag.id };
    }
  );

  const onTagsChangeHandler = (tags: MultiValue<ReactSelectType>): void => {
    setSeletedTags(
      tags.map((tag: ReactSelectType): Tag => {
        return { label: tag.label, id: tag.value };
      })
    );
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title.trim() === "" ||
          note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())) &&
        selectedTags.every((tag) =>
          note.tags.some((noteTag) => noteTag.id === tag.id)
        )
      );
    });
  }, [title, selectedTags, notes]);

  const toggleModal = () => {
    setShowEditTagModal(!showEditTagModal);
  };

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant="outline-secondary" onClick={toggleModal}>
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e: ChangeEvent): void =>
                  setTitle((e.target as HTMLInputElement).value)
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={tagsValue}
                onChange={onTagsChangeHandler}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={4} xl={4} className="g-3">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        availableTags={availableTags}
        show={showEditTagModal}
        toggleModal={toggleModal}
        updateTag={updateTag}
        deleteTag={deleteTag}
      />
    </>
  );
};

export default NoteList;
