import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

function ModalBase({ isShow, id, onDelete, onClose }) {
  return (
    <Modal show={isShow} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure, this action can not be undo!</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          Cancel
        </Button>
        <Button variant='primary' onClick={() => onDelete(id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalBase.propTypes = {
  id: PropTypes.number,
  isShow: PropTypes.bool,
  onDelete: PropTypes.func,
  onClose: PropTypes.func,
};

export default ModalBase;
