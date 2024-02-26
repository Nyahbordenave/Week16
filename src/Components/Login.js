import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // You can add your login logic here
    // For now, let's check if the username and password are not empty
    if (username !== '' && password !== '') {
      onLogin(); // Call the parent component's login function
      setIsLoggedIn(true);
    } else {
      // Handle invalid login attempt
      alert('Invalid username or password. Please try again.');
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Redirect to="/" />
        </Route>
        <Route path="/library">
          <Redirect to="/" />
        </Route>
        <Route path="/booksearch">
          <Redirect to="/" />
        </Route>
        <Route path="/">
          <Container className="mt-5">
            <Row className="justify-content-md-center">
              <Col xs={12} md={6}>
                <div className="text-center mt-3">
                  <h5 className="header">Please login below</h5>
                  <Form>
                    <Form.Group className="mb-3" controlId="formUsername">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Button variant="primary" onClick={handleLogin}>
                      Login
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </Route>
      </Switch>
    </Router>
  );
};

export default Login;
