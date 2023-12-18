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

const changePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;
    const result = await authService.changePassword(userId, currentPassword, newPassword);

    if (result.status) {
      res.status(200).json({ success: true, message: 'Password changed successfully',  });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
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

// const registerSuperAdmin = async (req, res) => {
//   try {
//     const { username, password, email, mobileNumber, firstName, lastName } = req.body;
//     const result = await authService.registerSuperAdmin(username, password, email, mobileNumber, firstName, lastName);
//     res.status(201).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

const loginSuperAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.loginSuperAdmin(username, password);

    if (result.status) {
      res.status(200).json({ success: true, message: result.message, data: result.data });
    } else {
      res.status(401).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



module.exports = {
  register,
  verifyOTP,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  // registerSuperAdmin,
  loginSuperAdmin,
};
