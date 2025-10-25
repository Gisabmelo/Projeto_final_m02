const db = require('../db/memoryDb');

function createBook({ title, author, quantity }) {
  return db.createBook({ title, author, quantity });
}

function findById(id) {
  return db.findBookById(id);
}

function search({ title, author }) {
  return db.searchBooks({ title, author });
}

function decrementQuantity(id) {
  return db.decrementBookQuantity(id);
}

module.exports = { createBook, findById, search, decrementQuantity };
