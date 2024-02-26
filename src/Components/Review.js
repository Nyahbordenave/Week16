import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Review = ({ onAddReview }) => {
  const [reviewText, setReviewText] = useState('');

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleAddReview = () => {
    onAddReview(reviewText);
    setReviewText(''); // Clear the review text input after submitting
  };

  return (
    <div>
      <Form.Group controlId="review">
        <Form.Label>Write a review:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter your review"
          value={reviewText}
          onChange={handleReviewChange}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleAddReview}>
        Submit Review
      </Button>
    </div>
  );
};

export default Review;