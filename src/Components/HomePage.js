import React from 'react';
import BookSearch from './BookSearch';
import { Container, Button } from 'react-bootstrap';
import Footer from './Footer';

const Home = () => {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to Novel Nest!</h1>
      <h2>A Haven for Bookworms</h2>

      {/* Include BookSearch component for book searching functionality */}
      <BookSearch />
      <Footer/>
    </Container>
  );
};

export default Home;