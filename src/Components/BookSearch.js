import React, { useState, useRef, useEffect } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';  // Don't forget to import Link
import BooksAPI from '../rest/BooksAPI';
import AddBook from './AddBook';
import Library from './Library';

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [addedBooks, setAddedBooks] = useState([]); // Track added books locally
  const [showAlert, setShowAlert] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddBookModal, setShowAddBookModal] = useState(false);

  const isMounted = useRef(true);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const booksData = await BooksAPI.fetchBooks(searchTerm);

      if (isMounted.current) {
        setBooks(booksData);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    // Set isMounted to false when the component is unmounted
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleAddBook = () => {
    if (!addedBooks.some((addedBook) => addedBook.id === selectedBook.id)) {
      setAddedBooks((prevBooks) => [...prevBooks, selectedBook]);
      setShowAlert(true);
    } else {
      console.warn('Book is already in the library!');
    }
  };

  const handleRemoveBook = (bookId) => {
    setAddedBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  return (
    <Container className="mt-4">
      {/* Search Bar */}
      <Form onSubmit={handleSearch} className="mb-4 d-flex">
        <Form.Group controlId="searchTerm" className="flex-grow-1">
          <Form.Control
            type="text"
            placeholder="Enter a book title or author"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="ml-2">
          Search
        </Button>
      </Form>

      {/* Display Books */}
      {books.map((book) => (
        <Container key={book.id} className="mb-4">
          <Card>
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
            <Button
              onClick={() => {
                setSelectedBook(book);
                setShowAddBookModal(true);
              }}
            >
              Add to Library
            </Button>
          </Card>
        </Container>
      ))}

      {/* View Library button */}
      <Button as={Link} to="/library" variant="primary">
        View Your Library
      </Button>

      {/* Display Alert when a book is added */}
      {showAlert && (
        <Container className="mt-4">
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            Book added to the library!
          </Alert>
        </Container>
      )}

      {/* Display the Library component dynamically */}
      <Library addedBooks={addedBooks} onRemoveBook={handleRemoveBook} onAddBook={handleAddBook} />

      {/* AddBook modal */}
      {selectedBook && (
        <AddBook
          show={showAddBookModal}
          handleClose={() => setShowAddBookModal(false)}
          onAddBook={handleAddBook}
        />
      )}
    </Container>
  );
};

export default BookSearch;