const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');

router.get('/api/tracks/:id', trackController.get_single_track);
router.get('/api/tracks', trackController.get_track);
router.delete('/api/tracks/:id', trackController.delete_track);
router.post('/api/tracks/:id', trackController.update_track);
router.post('/api/tracks/', trackController.post_track);

module.exports = router;
