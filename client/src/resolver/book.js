const { AuthenticationError } = require('apollo-server-express');
const { Book } = require('../models');
const { User } = require('../models');

const resolvers = {
  Query: {
    // get a single book by its _id (with auth)
    book: async (parent, { _id }, context) => {
      if (context.user) {
        const book = await Book.findOne({ _id }).populate('authors');
        return book;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // get all books (with auth)
    books: async (parent, args, context) => {
      if (context.user) {
        const books = await Book.find({}).populate('authors');
        return books;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    // add a book to the user's saved books (with auth)
    saveBook: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },
          { new: true, runValidators: true }
        ).populate('savedBooks');

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // remove a book from the user's saved books (with auth)
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        ).populate('savedBooks');

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
