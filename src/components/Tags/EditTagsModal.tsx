import { Form, Modal, Row, Stack } from "react-bootstrap";
import { Tag } from "../../modals/types";
import SingleTag from "./SingleTag";

type EditTagsModalProps = {
  availableTags: Tag[];
  show: boolean;
  toggleModal: () => void;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};

const EditTagsModal = ({
  availableTags,
  show,
  toggleModal,
  updateTag,
  deleteTag,
}: EditTagsModalProps) => {
  return (
    <Modal show={show} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <SingleTag
                  id={tag.id}
                  label={tag.label}
                  updateTag={updateTag}
                  deleteTag={deleteTag}
                  toggleModal={toggleModal}
                />
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTagsModal;
