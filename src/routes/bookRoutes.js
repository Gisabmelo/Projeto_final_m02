const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { jwtAuth } = require('../middleware/authMiddleware');

// Register a book (requires auth)
router.post('/', jwtAuth, bookController.registerBook);

// Search books (requires auth)
router.get('/', jwtAuth, bookController.searchBooks);

// Get a specific book (requires auth)
router.get('/:id', jwtAuth, bookController.getBook);

// Request an exchange (reduces quantity by 1) (requires auth)
router.post('/:id/exchange', jwtAuth, bookController.requestExchange);

module.exports = router;
