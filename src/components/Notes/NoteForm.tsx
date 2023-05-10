import { FormEvent, useRef, useState } from "react";
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { MultiValue } from "react-select/dist/declarations/src";
import { Link, useNavigate } from "react-router-dom";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import Editor, { ContextStore } from "@uiw/react-md-editor";
import {
  NoteData,
  RawNoteData,
  ReactSelectType,
  Tag,
} from "application/modals/types";
import { addNote, updateNote } from "application/redux/slice/noteSlice";
import { createNewTag } from "application/redux/slice/tagSlice";
import { RootState } from "application/redux/store";
import useNote from "hooks/useNote";

type NoteFormProps = Partial<NoteData>;

const NoteForm = ({ title = "", body = "", tags = [] }: NoteFormProps) => {
  const [markdown, setMarkdown] = useState<string>(body);
  const note = useNote();
  const dispatch = useDispatch();
  const thunkDispatch = useDispatch<ThunkDispatch<string, void, AnyAction>>();
  const availableTags = useSelector((store: RootState) => store.tag.tags);

  const titleRef = useRef<HTMLInputElement>(null);
  const [selectedTags, setSeletedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const noteData: RawNoteData = {
      title: titleRef.current!.value,
      body: markdown,
      tagIds: selectedTags.map((tag) => tag.id),
    };
    if (note) {
      dispatch(
        updateNote({
          id: note.id,
          ...noteData,
        })
      );
    } else {
      dispatch(addNote(noteData));
    }
    navigate("..");
  };

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

  const onCreateNewTag = async (label: string): Promise<void> => {
    const newTag = await thunkDispatch(createNewTag(label)).unwrap();
    console.log(newTag);
    setSeletedTags((prevTags) => [...prevTags, newTag]);
  };

  // const handleEditorChange = ({ text }: { text: string }) => {
  //   setValue(text);
  // };

  const handleEditorChange = (
    value?: string,
    _event?: React.ChangeEvent<HTMLTextAreaElement>,
    _state?: ContextStore
  ) => {
    setMarkdown(value || "");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                value={tagsValue}
                onChange={onTagsChangeHandler}
                onCreateOption={onCreateNewTag}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="body">
          <Form.Label>Body</Form.Label>
          <div data-color-mode="light">
            <Editor
              height={400}
              value={markdown}
              onChange={handleEditorChange}
            />
          </div>
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
