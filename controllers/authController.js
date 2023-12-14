// controllers/authController.js
const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const { username, password, role  } = req.body;
    const result = await authService.registerUser(username, password,role);
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



module.exports = {
  register,
  verifyOTP,
};
