const express = require('express');
const router = express.Router();

const videoController = require('../controllers/videoController');

router.post('/api/videos', videoController.post_video);
router.delete('/api/videos/:id', videoController.delete_video);
router.post('/api/videos/:id', videoController.update_video);
router.get('/api/videos/:id', videoController.get_single_video);
router.get('/api/videos', videoController.get_video);

module.exports = router;
