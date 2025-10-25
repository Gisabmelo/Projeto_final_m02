const bookModel = require('../models/bookModel');

function registerBook({ title, author, quantity }) {
  if (!title || !author || quantity == null) {
    const err = new Error('title, author and quantity are required');
    err.status = 400;
    throw err;
  }
  if (Number(quantity) < 0) {
    const err = new Error('quantity must be >= 0');
    err.status = 400;
    throw err;
  }
  return bookModel.createBook({ title, author, quantity });
}

function getBook(id) {
  const book = bookModel.findById(id);
  if (!book) {
    const err = new Error('book not found');
    err.status = 404;
    throw err;
  }
  return book;
}

function searchBooks(query) {
  return bookModel.search(query);
}

function requestExchange(id) {
  const result = bookModel.decrementQuantity(id);
  if (result === null) {
    const err = new Error('book not found');
    err.status = 404;
    throw err;
  }
  if (result === false) {
    const err = new Error('no copies available for exchange');
    err.status = 409;
    throw err;
  }
  return result;
}

module.exports = { registerBook, getBook, searchBooks, requestExchange };
