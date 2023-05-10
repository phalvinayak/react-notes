import { deleteTag, updateTag } from "application/redux/slice/tagSlice";
import { useState } from "react";
import { Button, Col, Form, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";

type SingleTagProps = {
  id: string;
  label: string;
};

const SingleTag = ({ id, label }: SingleTagProps) => {
  const [tagTitle, setTagTitle] = useState<string>(label);
  const dispatch = useDispatch();

  const onUpdateHandler = (): void => {
    dispatch(updateTag({ id, label: tagTitle }));
  };

  const onDeleteHandler = (): void => {
    dispatch(deleteTag(id));
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
