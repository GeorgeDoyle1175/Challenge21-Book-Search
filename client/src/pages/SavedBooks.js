import React, { useState, useEffect } from "react";
import { Jumbotron, Container, CardColumns, Card, Button } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import { REMOVE_BOOK } from "../graphql/mutations";

const SavedBooks = () => {
  // Define state to hold retrieved book data
  const [userData, setUserData] = useState({});

  // Define mutation to remove books from saved list
  const [removeBook] = useMutation(REMOVE_BOOK);

  // Fetch user data with GET_ME query
  const { loading, error, data } = useQuery(GET_ME);

  // Set user data to state once data is retrieved
  useEffect(() => {
    if (data) {
      setUserData(data.me);
    }
  }, [data]);

  // Define function to handle book removal
  const handleBookRemoval = async (bookId) => {
    try {
      const { data } = await removeBook({
        variables: { bookId },
      });
      setUserData(data.removeBook);
    } catch (err) {
      console.error(err);
    }
  };

  // If data is still loading, return a 'Loading...' message
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // If there is an error fetching data, return an error message
  if (error) {
    console.error(error);
    return <h2>Error</h2>;
  }

  // Otherwise, render saved books
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? "book" : "books"}:`
            : "You have no saved books!"}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant="top" /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className="btn-block btn-danger" onClick={() => handleBookRemoval(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
