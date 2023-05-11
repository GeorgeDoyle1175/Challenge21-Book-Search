import React, { useState } from "react";
import { Jumbotron, Container, Col, Form, Button, CardColumns, Card } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { SAVE_BOOK } from "../graphql/mutations";
import { searchGoogleBooks } from "../utils/API";

const SearchBooks = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [saveBook] = useMutation(SAVE_BOOK);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await searchGoogleBooks(searchInput);
      const books = response.items.map((book) => {
        const { title, authors, description, imageLinks, infoLink } = book.volumeInfo;
        return { title, authors, description, image: imageLinks?.thumbnail, link: infoLink };
      });
      setSearchedBooks(books);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveBook = async (book) => {
    try {
      await saveBook({ variables: { book } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Books</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={handleInputChange}
                  type="text"
                  size="lg"
                  placeholder="Search for a book"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg" className="ml-3">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>{searchedBooks.length ? `Viewing ${searchedBooks.length} results:` : "Search for a book to begin"}</h2>
        <CardColumns>
          {searchedBooks.map((book) => {
            return (
              <Card key={book.link} border="dark">
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant="top" /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className="btn-block btn-info mt-auto" href={book.link} target="_blank">
                    More Info
                  </Button>
                  <Button className="btn-block btn-success mt-auto" onClick={() => handleSaveBook(book)}>
                    Save this Book!
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

export default SearchBooks;
