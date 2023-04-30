import React from "react";
import { Tag } from "../modals/types";
import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./NotesList.module.css";

type NoteCardProps = {
  id: string;
  title: string;
  tags: Tag[];
};

const NoteCard = ({ id, title, tags }: NoteCardProps) => {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h1-100"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              direction="horizontal"
              gap={1}
              className="justify-content-center flex-wrap"
            >
              {tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
