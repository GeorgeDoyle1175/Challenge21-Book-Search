import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }
`;

export const GET_ALL_BOOKS = gql`
  query getBooks {
    books {
      _id
      authors
      description
      title
      image
      link
    }
  }
`;

export const GET_SAVED_BOOKS = gql`
  query savedBooks {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }
`;
