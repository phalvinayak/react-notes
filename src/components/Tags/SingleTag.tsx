import { useState } from "react";
import { Button, Col, Form, Stack } from "react-bootstrap";

type SingleTagProps = {
  id: string;
  label: string;
  toggleModal: () => void;
  deleteTag: (id: string) => void;
  updateTag: (id: string, label: string) => void;
};

const SingleTag = ({
  id,
  label,
  toggleModal,
  updateTag,
  deleteTag,
}: SingleTagProps) => {
  const [tagTitle, setTagTitle] = useState<string>(label);

  const onUpdateHandler = (): void => {
    updateTag(id, tagTitle);
    toggleModal();
  };

  const onDeleteHandler = (): void => {
    deleteTag(id);
    toggleModal();
  };

  return (
    <>
      <Col>
        <Form.Control
          type="text"
          value={tagTitle}
          onChange={(e) => setTagTitle(e.target.value)}
        />
      </Col>
      <Col xs="auto">
        <Stack gap={2} direction="horizontal">
          <Button variant="primary" onClick={onUpdateHandler}>
            Save
          </Button>
          <Button variant="outline-danger" onClick={onDeleteHandler}>
            &times;
          </Button>
        </Stack>
      </Col>
    </>
  );
};

export default SingleTag;
