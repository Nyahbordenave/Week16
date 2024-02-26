import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Rating = ({ onAddRating }) => {
  const [rating, setRating] = useState('');

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleAddRating = () => {
    onAddRating(rating);
    setRating(''); // Clear the rating input after submitting
  };

  return (
    <div>
      <Form.Group controlId="rating">
        <Form.Label>Rate the book:</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter your rating (1-5)"
          min="1"
          max="5"
          value={rating}
          onChange={handleRatingChange}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleAddRating}>
        Submit Rating
      </Button>
    </div>
  );
};

export default Rating;