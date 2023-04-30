import { FormEvent, useRef, useState } from "react";
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { MultiValue } from "react-select/dist/declarations/src";
import { v4 as uuidV4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { NoteData, ReactSelectType, Tag } from "../modals/types";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  body = "",
  tags = [],
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSeletedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      body: bodyRef.current!.value,
      tags: selectedTags,
    });

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

  const onCreateNewTag = (label: string): void => {
    const newTag: Tag = { id: uuidV4(), label };
    onAddTag(newTag);
    setSeletedTags((prevTags) => [...prevTags, newTag]);
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
          <Form.Control
            ref={bodyRef}
            required
            as="textarea"
            rows={15}
            defaultValue={body}
          />
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
