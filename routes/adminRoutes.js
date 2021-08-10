const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');


router.use('/api/admin', authMiddleware.authMiddleware);

router.get('/api/admin',adminController.admin_get);
router.post('/api/admin', adminController.admin_update);
router.post('/adminpassword', adminController.admin_check);
router.post('/api/client', adminController.check_password);
router.post('/adminpassword', adminController.check_admin_password);

module.exports = router;
