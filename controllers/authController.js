// controllers/authController.js
const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const { idNumber, password, role, email, mobileNumber,firstName, lastName} = req.body;
    const result = await authService.registerUser(idNumber, password,role, email, mobileNumber,firstName, lastName);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { idNumber, otp } = req.body;
    const result = await authService.verifyOTP(idNumber, otp);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { idNumber } = req.body;
    const result = await authService.resendOTP(idNumber);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
  register,
  verifyOTP,
  resendOTP,
};
