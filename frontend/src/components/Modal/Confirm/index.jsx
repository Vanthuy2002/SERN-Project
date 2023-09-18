import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

function ModalBase({ isShow, id, onHandle, onClose, isLogout = false }) {
  return (
    <Modal show={isShow} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isLogout ? 'Logout' : 'Delete User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure???, this action can not be undo!</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant='primary'
          onClick={isLogout ? onHandle : () => onHandle(id)}
        >
          {isLogout ? 'Confirm' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalBase.propTypes = {
  id: PropTypes.number,
  isShow: PropTypes.bool,
  onHandle: PropTypes.func,
  onClose: PropTypes.func,
  isLogout: PropTypes.bool,
};

export default ModalBase;
