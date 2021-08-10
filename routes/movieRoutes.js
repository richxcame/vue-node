const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/api/movies', movieController.get_movie);
router.get('/api/movies/:id', movieController.get_single_movie);
router.post('/api/movies', movieController.post_movie);
router.post('/api/movies/:id', movieController.update_movie);
router.delete('/api/movies/:id', movieController.delete_movie);

module.exports = router;  
