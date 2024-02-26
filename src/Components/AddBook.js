import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';

const AddBook = ({ show, handleClose, onAddBook }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');

  const handleAddBook = () => {
    // Call the parent component's function to add the book to the library
    onAddBook(reviewText, rating);

    // Show the alert when a book is added
    setShowAlert(true);

    // Close the add book modal
    handleClose();
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showAlert]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add to Library</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to add this book to your library?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddBook}>
          Add to Library
        </Button>
      </Modal.Footer>
      {/* Display Alert when a book is added */}
      {showAlert && (
        <Modal.Footer>
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            Book added to the library!
          </Alert>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default AddBook;
