import { useState, useMemo, ChangeEvent } from "react";
import { Form, Button, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { useSelector } from "react-redux";
import { MultiValue } from "react-select/dist/declarations/src";
import { ReactSelectType, Tag } from "application/modals/types";
import NoteCard from "components/Notes/NoteCard";
import EditTagsModal from "components/Tags/EditTagsModal";
import { RootState } from "application/redux/store";
import { useNotesWithTags } from "hooks/useNotesWithTags";

const NoteList = () => {
  const notes = useNotesWithTags();
  const tags = useSelector((store: RootState) => store.tag.tags);

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
  }, [notes, title, selectedTags]);

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
                options={tags.map((tag) => {
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
      <EditTagsModal show={showEditTagModal} toggleModal={toggleModal} />
    </>
  );
};

export default NoteList;
