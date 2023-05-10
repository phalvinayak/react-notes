import { Form, Modal, Row, Stack } from "react-bootstrap";
import SingleTag from "components/Tags/SingleTag";
import { useSelector } from "react-redux";
import { RootState } from "application/redux/store";

type EditTagsModalProps = {
  show: boolean;
  toggleModal: () => void;
};

const EditTagsModal = ({ show, toggleModal }: EditTagsModalProps) => {
  const tags = useSelector((store: RootState) => store.tag.tags);
  return (
    <Modal show={show} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {tags.map((tag) => (
              <Row key={tag.id}>
                <SingleTag id={tag.id} label={tag.label} />
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTagsModal;
