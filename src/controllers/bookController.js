const bookService = require('../services/bookService');

async function registerBook(req, res, next) {
  try {
    const book = bookService.registerBook(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
}

async function getBook(req, res, next) {
  try {
    const book = bookService.getBook(req.params.id);
    res.json(book);
  } catch (err) {
    next(err);
  }
}

async function searchBooks(req, res, next) {
  try {
    const books = bookService.searchBooks(req.query);
    res.json(books);
  } catch (err) {
    next(err);
  }
}

async function requestExchange(req, res, next) {
  try {
    const book = bookService.requestExchange(req.params.id);
    res.json({ message: 'exchange successful', book });
  } catch (err) {
    next(err);
  }
}

module.exports = { registerBook, getBook, searchBooks, requestExchange };
