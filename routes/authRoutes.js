// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();


router.post('/register', authController.register);
router.post('/verify-otp', authController.verifyOTP);
router.post('/resend-otp', authController.resendOTP);

module.exports = router;
