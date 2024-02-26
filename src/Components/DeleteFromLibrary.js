import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteFromLibrary = ({ show, handleClose, onDelete }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete from Library</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this book from your library?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => { onDelete(); handleClose(); }}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteFromLibrary;