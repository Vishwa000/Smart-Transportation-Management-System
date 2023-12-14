// services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/config');
const { registerValidation, loginValidation } = require('./validation');
const { validateEmail, validateMobileNumber, validateName } = require('./validationUtils');


const generateOTP = () => {
  // Generate a random 6-digit OTP
  const randomOTP = Math.floor(100000 + Math.random() * 900000).toString();
  return randomOTP;
};

const sendOTP = async (user, otp) => {
  // Implement logic to send the OTP (e.g., send an email or SMS)
  console.log(`Sending OTP ${otp} to user ${user.username}`);
};

const formatUserData = (user) => {
  const { _id, username, role, email, mobileNumber, firstName, lastName, createdAt, updatedAt } = user;
  return {
    id: _id,
    username,
    role,
    email,
    mobileNumber,
    firstName,
    lastName,
    created_at: createdAt,
    updated_at: updatedAt,
  };
};

const generateToken = (user) => {
  const tokenPayload = {
    userId: user._id,
    username: user.username,
    role: user.role,
  };

  const expiresIn = 3600; // Adjust the expiration time as needed
  const expiryDatetime = new Date(Date.now() + expiresIn * 1000);

  // Generate a JWT token
  const access_token = jwt.sign(tokenPayload, config.secretKey, {
    expiresIn,
  });

  // Generate a JWT token with a longer expiration time (refresh token)
  const refresh_token = jwt.sign(tokenPayload, config.secretKey, {
    expiresIn: 604800, // Set a longer expiration time for the refresh token
  });
  return {
    access_token,
    refresh_token,
    expires_in: expiresIn,
    expiry_datetime: expiryDatetime,
  };
};

const refreshAccessToken = (oldTokenPayload) => {
  // Extract user information from the old token
  const { userId, username, role } = oldTokenPayload;

  // Generate a new access token with the same user information
  const newAccessToken = jwt.sign({ userId, username, role }, config.secretKey, {
    expiresIn: '1h',
  });

  return { access_token: newAccessToken };
};

const forgotPassword = async (username) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return { status: 'Invalid username' };
    }

    const otp = generateOTP();
    user.otp = otp;
    await user.save();

    await sendOTP(user, otp);

    return { status: 'OTP sent successfully' };
  } catch (error) {
    console.error(error);
    return { status: 'Failed to initiate forgot password process. Please try again later.' };
  }
};

const resetPassword = async (username, newPassword, confirmPassword, otp) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return { status: 'Invalid username' };
    }

    if (otp !== user.otp) {
      return { status: 'Invalid OTP' };
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      return { status: 'New password and confirm password do not match' };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null; // Clear the OTP after successful password reset
    await user.save();

    return { status: 'Password reset successful' };
  } catch (error) {
    console.error(error);
    return { status: 'Password reset failed. Please try again later.' };
  }
};


const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { status: false, message: 'User not found' };
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return { status: false, message: 'Current password is incorrect' };
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    // Generate a new access token after changing the password
    // const tokenPayload = {
    //   userId: user._id,
    //   username: user.username,
    //   role: user.role,
    // };
    // const newAccessToken = jwt.sign(tokenPayload, config.secretKey, {
    //   expiresIn: '1h',
    // });

    return { status: true, message: 'Password changed successfully',  };
  } catch (error) {
    console.error(error);
    return { status: false, message: 'Error changing password. Please try again later.' };
  }
};

const registerUser = async (username, password, role, email, mobileNumber, firstName, lastName) => {
  // Validate user input using Joi
  const validation = registerValidation({ username, password, role, email, mobileNumber });

  if (validation.error) {
    return { status: validation.error.details[0].message };
  }

  // Validate email and mobile number
  const emailValidation = validateEmail(email);
  if (emailValidation.error) {
    return { status: 'Invalid email format' };
  }

  const mobileNumberValidation = validateMobileNumber(mobileNumber);
  if (mobileNumberValidation.error) {
    return { status: 'Invalid mobile number format' };
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return { status: 'Username already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      email,
      mobileNumber,
      otp,
      firstName,
      lastName
    });

    await newUser.save();
    await sendOTP(newUser, otp);

    return { status: 'User registered successfully. OTP sent.' };
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return { status: 'Registration failed. Please try again later.' };
  }
};

const verifyOTP = async (username, enteredOTP) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return { status: 'Invalid username' };
    }

    // Hardcoded OTP for demonstration, replace with your logic
    // const hardcodedOTP = '123456';

    if (enteredOTP !== user.otp) {
      return { status: 'Invalid OTP' };
    }

    // Update user status or perform any additional logic upon successful OTP verification
    user.isVerified = true;
    await user.save();

    return { message: 'OTP verified successfully' };
  } catch (status) {
    return { status: `Error during OTP verification: ${status.message}` };
  }
};
const loginUser = async (username, password, role) => {
  // Validate user input using Joi
  const validation = loginValidation({ username, password, role });

  if (validation.error) {
    return { status: validation.error.details[0].message };
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return { status: 'Invalid username or password' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { status: 'Invalid username or password' };
    }

    if (user.role !== role) {
      return { status: 'Role mismatch' };
    }

    if (!user.isVerified) {
      return { status: 'User is not verified. Please verify OTP.' };
    }

    const token = generateToken(user);
    const userData = formatUserData(user);

    return {
      status: true,
      message: 'Login successful',
      data: { user: userData },
      token,
    };
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return { status: false, message: 'Login failed. Please try again later.' };
  }
};

module.exports = { registerUser, loginUser, verifyOTP, refreshAccessToken, forgotPassword, resetPassword,changePassword};