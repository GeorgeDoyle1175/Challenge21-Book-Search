const API = {
  async loginUser(username, password) {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const userData = await response.json();
    return userData;
  },

  async signupUser(username, password, email) {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const userData = await response.json();
    return userData;
  },

  async searchBooks(searchTerm) {
    const response = await fetch(`/api/books/search?q=${searchTerm}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const bookData = await response.json();
    return bookData;
  },

  async saveBook(bookData, token) {
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const savedBookData = await response.json();
    return savedBookData;
  },

  async getSavedBooks(token) {
    const response = await fetch('/api/books', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const savedBookData = await response.json();
    return savedBookData;
  },

  async deleteSavedBook(bookId, token) {
    const response = await fetch(`/api/books/${bookId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const deleteData = await response.json();
    return deleteData;
  },
};

export default API;
