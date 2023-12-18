const otpService = require('../services/otpService');
const User = require('../models/user');


exports.verifyOTP = async (req, res) => {
  try {
    const { mobileNumber, userOTP } = req.body;

    // Find the user by mobile number
    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Verify OTP
    const isOTPVerified = otpService.verifyOTP(userOTP, '');

    if (isOTPVerified) {
      // Update user's isVerified status or perform any other actions
      user.isVerified = true;
      await user.save();
      
      return res.json({ success: true, message: 'OTP verification successful.' });
    } else {
      return res.status(400).json({ success: false, message: 'OTP verification failed.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
