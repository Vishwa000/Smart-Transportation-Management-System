const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/admin', adminController.getAllAdmin);
router.patch('/admin/:adminId', adminController.updateAdmin);

module.exports = router;