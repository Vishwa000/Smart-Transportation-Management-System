// controllers/authController.js
const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const { username, password, role, email, mobileNumber,firstName, lastName} = req.body;
    const result = await authService.registerUser(username, password,role, email, mobileNumber,firstName, lastName);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { username, otp } = req.body;
    const result = await authService.verifyOTP(username, otp);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;
    const result = await authService.forgotPassword(username);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { username, newPassword, confirmPassword, otp } = req.body;
    const result = await authService.resetPassword(username, newPassword, confirmPassword, otp);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const login = async (req, res) => {
  try {
    const { username, password, role, email, mobileNumber,firstName, lastName} = req.body;
    const result = await authService.loginUser(username, password,role, email, mobileNumber,firstName, lastName);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  register,
  verifyOTP,
  login,
  forgotPassword,
  resetPassword,
};
