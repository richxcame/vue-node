const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

router.get('/api/books', bookController.get_book);
router.get('/api/books/:id', bookController.get_single_book);
router.post('/api/books', bookController.post_book);
router.delete('/api/books/:id', bookController.delete_book);
router.post('/api/books/:id', bookController.update_book);

module.exports = router;
