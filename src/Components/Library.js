import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import Review from './Review';
import Rating from './Rating';

const Library = ({ addedBooks, onRemoveBook }) => {
  const [bookData, setBookData] = useState({});
  const [removedBookAlert, setRemovedBookAlert] = useState(null);

  useEffect(() => {
    // Show the alert for 3 seconds when a book is removed
    if (removedBookAlert) {
      const timeoutId = setTimeout(() => {
        setRemovedBookAlert(null);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [removedBookAlert]);

  const handleRemoveBook = (bookId) => {
    onRemoveBook(bookId);

    // Remove associated review and rating when removing the book
    setBookData((prevData) => {
      const updatedData = { ...prevData };
      delete updatedData[bookId];
      return updatedData;
    });

    // Set the alert message when a book is removed
    setRemovedBookAlert(`Book "${addedBooks.find((book) => book.id === bookId)?.volumeInfo.title}" removed from the library`);
  };

  return (
    <div>
      <h2>Your Library</h2>

      {/* Display added books */}
      {addedBooks.map((book) => (
        <Card key={book.id} className="mb-4">
          <Card.Header>{book.volumeInfo.title}</Card.Header>
          <Card.Body>
            {book.volumeInfo.imageLinks && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={`Cover for ${book.volumeInfo.title}`}
                style={{ maxWidth: '100px', maxHeight: '150px', marginBottom: '10px' }}
              />
            )}
            <Card.Subtitle className="mb-2 text-muted">{book.volumeInfo.authors.join(', ')}</Card.Subtitle>
            <Card.Text>{book.volumeInfo.description}</Card.Text>
          </Card.Body>

          {/* Delete button */}
          <Button variant="danger" onClick={() => handleRemoveBook(book.id)}>
            Delete
          </Button>

          {/* Display Reviews and Ratings */}
          <div>
            <h4>Reviews and Ratings</h4>
            <ul>
              {bookData[book.id]?.map((entry, index) => (
                <li key={index}>
                  <strong>Rating:</strong> {entry.rating} | <strong>Review:</strong> {entry.review}
                </li>
              ))}
            </ul>
            {/* Add Review and Rating Component */}
            <Review
              onAddReview={(reviewText) => {
                setBookData((prevData) => ({
                  ...prevData,
                  [book.id]: [
                    ...(prevData[book.id] || []),
                    { rating: prevData[book.id]?.[0]?.rating || '', review: reviewText },
                  ],
                }));
              }}
            />
            <Rating
              onAddRating={(rating) => {
                setBookData((prevData) => ({
                  ...prevData,
                  [book.id]: [
                    { rating: rating, review: prevData[book.id]?.[0]?.review || '' },
                    ...(prevData[book.id]?.slice(1) || []),
                  ],
                }));
              }}
            />
          </div>
        </Card>
      ))}

      {/* Alert for removed book */}
      {removedBookAlert && <Alert variant="success">{removedBookAlert}</Alert>}
    </div>
  );
};

export default Library;