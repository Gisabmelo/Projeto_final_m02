// Reader model helpers (thin wrapper over DB)
const db = require('../db/memoryDb');

function createReader({ name, passwordHash }) {
  return db.createReader({ name, passwordHash });
}

function findByName(name) {
  return db.findReaderByName(name);
}

function findById(id) {
  return db.findReaderById(id);
}

module.exports = { createReader, findByName, findById };
