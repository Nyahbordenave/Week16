const apiKey = "AIzaSyA32yzgN_M1OozzGS9OHKG5fHCB9KKHAac";

const BooksAPI = {
  fetchBooks: async (searchTerm) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}&maxResults=10`
      );
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      throw new Error('Error fetching books:', error);
    }
  },
};

export default BooksAPI;