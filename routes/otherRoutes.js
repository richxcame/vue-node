const express = require('express');
const router = express.Router();


const otherController = require('../controllers/otherController');

router.get('/api/tags', otherController.get_tags);
router.get('/api/search', otherController.search);
router.post('/register', otherController.register);

module.exports = router;
