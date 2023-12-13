// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/register', authController.register);
router.post('/verify-otp', authController.verifyOTP);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password', authController.resetPassword);
router.post('/change-password', authController.changePassword);

module.exports = router;
