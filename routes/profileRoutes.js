// routes/profileRoutes.js
const express = require('express');
const profileController = require('../controllers/profileController');
const router = express.Router();

router.get('/profile', profileController.getProfile);
router.post('/profile/update', profileController.updateProfile);

module.exports = router;
