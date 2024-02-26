import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5">
      <Container>
        <Row className="py-3">
          <Col md={2}>
            <h5>Contact Us</h5>
            <p>Email: customerservice@novelnest.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </Col>
          <Col md={4}>
            <h5>Connect With Us</h5>
            {/* Add your social media icons or links here */}
            <p>Facebook | Twitter | Instagram</p>
          </Col>
          <Col md={4}>
            <h5>About Us</h5>
            <p>Novel Nest</p>
            <p>&copy; {new Date().getFullYear()}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;