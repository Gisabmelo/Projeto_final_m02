const readerModel = require('../models/readerModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

async function register({ name, password }) {
  if (!name || !password) {
    const err = new Error('name and password are required');
    err.status = 400;
    throw err;
  }

  const existing = readerModel.findByName(name);
  if (existing) {
    const err = new Error('reader already exists');
    err.status = 409;
    throw err;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return readerModel.createReader({ name, passwordHash: hash });
}

async function login({ name, password }) {
  if (!name || !password) {
    const err = new Error('name and password are required');
    err.status = 400;
    throw err;
  }

  const reader = readerModel.findByName(name);
  if (!reader) {
    const err = new Error('invalid credentials');
    err.status = 401;
    throw err;
  }

  const match = await bcrypt.compare(password, reader.passwordHash);
  if (!match) {
    const err = new Error('invalid credentials');
    err.status = 401;
    throw err;
  }

  const token = jwt.sign({ sub: reader.id, name: reader.name }, JWT_SECRET, { expiresIn: '2h' });
  return { token };
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    const err = new Error('invalid token' + (e && e.message ? ': ' + e.message : ''));
    err.status = 401;
    throw err;
  }
}

module.exports = { register, login, verifyToken };
