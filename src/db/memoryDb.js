// Simple in-memory database
const { v4: uuidv4 } = require('uuid');

const readers = [];
const books = [];

function createReader({ name, passwordHash }) {
  const reader = { id: uuidv4(), name, passwordHash };
  readers.push(reader);
  return { id: reader.id, name: reader.name };
}

function findReaderByName(name) {
  return readers.find(r => r.name === name);
}

function findReaderById(id) {
  return readers.find(r => r.id === id);
}

function createBook({ title, author, quantity }) {
  const book = { id: uuidv4(), title, author, quantity: Number(quantity) };
  books.push(book);
  return book;
}

function findBookById(id) {
  return books.find(b => b.id === id);
}

function searchBooks({ title, author }) {
  return books.filter(b => {
    if (title && !b.title.toLowerCase().includes(title.toLowerCase())) return false;
    if (author && !b.author.toLowerCase().includes(author.toLowerCase())) return false;
    return true;
  });
}

function decrementBookQuantity(id) {
  const book = findBookById(id);
  if (!book) return null;
  if (book.quantity <= 0) return false;
  book.quantity -= 1;
  return book;
}

module.exports = {
  createReader,
  findReaderByName,
  findReaderById,
  createBook,
  findBookById,
  searchBooks,
  decrementBookQuantity,
  // Expose internal arrays for testing/debug if needed
  __internal: { readers, books }
};
