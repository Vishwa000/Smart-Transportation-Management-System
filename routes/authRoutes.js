// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const { checkTokenExpiration } = require('../utils/middlewares');
const router = express.Router();

router.post('/register', authController.register);
router.post('/verify-otp', authController.verifyOTP);
router.post('/login',authController.login);
router.post('/forgot-password', authController.forgotPassword);
// router.post('/register-superadmin', authController.registerSuperAdmin);
// router.post('/login-superadmin', authController.loginSuperAdmin);

// Protected routes (token validation required)
router.use(checkTokenExpiration); // Apply middleware to all routes below this line

router.patch('/reset-password', authController.resetPassword);
router.post('/change-password', authController.changePassword);

module.exports = router;
