import { useCallback } from "react";
import useNote from "../hooks/useNote";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type SingleNoteProps = {
  onDelete: (id: string) => void;
};

const SingleNote = ({ onDelete }: SingleNoteProps) => {
  const note = useNote();
  const navigate = useNavigate();

  const onDeleteClickHandler = useCallback(() => {
    onDelete(note.id);
    navigate("/");
  }, [note.id, navigate]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack direction="horizontal" gap={1} className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button variant="outline-danger" onClick={onDeleteClickHandler}>
              Delete
            </Button>
            <Link to="..">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.body}</ReactMarkdown>
    </>
  );
};

export default SingleNote;
