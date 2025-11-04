const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a reader
router.post('/register', authController.register);

// Login to get JWT token
router.post('/login', authController.login);

module.exports = router;
