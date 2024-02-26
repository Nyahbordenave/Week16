import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import NavbarComponent from './Components/navbar';
import Home from './Components/HomePage';
import Library from './Components/Library';
import Footer from './Components/Footer';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addedBooks, setAddedBooks] = useState([]); // Define addedBooks state

  // Define handleRemoveBook function
  const handleRemoveBook = (bookId) => {
    setAddedBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  // Define handleAddBook function
  const handleAddBook = (book) => {
    setAddedBooks((prevBooks) => [...prevBooks, book]);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <NavbarComponent />

      <Switch>
        <Route path="/home" render={() => (isLoggedIn ? <Home /> : <Redirect to="/" />)} />
        {/* Pass the necessary props to the Library component */}
        <Route
        path="/library"
        render={() => (isLoggedIn ? (
          <Library addedBooks={addedBooks} onRemoveBook={handleRemoveBook} />

      ) : (
          <Redirect to="/" />
          ))}/>
        <Route
          path="/"
          exact
          render={() => (
            <>
              <div className="text-center mt-3">
                <h1 className="header"> Welcome to Novel Nest!</h1>
                <h2 className="header"> A Haven for Bookworms </h2>
                <Login onLogin={handleLogin} />
              </div>
              <Footer/>
            </>
          )}
        />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
};

// Export the App component
export default App;