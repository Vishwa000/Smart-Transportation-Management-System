// services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/config');

const generateOTP = () => {
  // Generate a random 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTP = async (user, otp) => {
  // Implement logic to send the OTP (e.g., send an email or SMS)
  console.log(`Sending OTP ${otp} to user ${user.username}`);
};

const registerUser = async (username, password,role) => {
  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    // Set actualRole to role if role is truthy, otherwise explicitly set to undefined
    const actualRole = role !== undefined ? role : undefined;

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      otp,
    });

    // Save the user to the database
    await newUser.save();
    await sendOTP(newUser, otp);

    return { message: 'User registered successfully. OTP sent.' };
  } catch (error) {
    throw error;
  }
};

const verifyOTP = async (username, enteredOTP) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Invalid username');
    }

    // Hardcoded OTP for demonstration, replace with your logic
    const hardcodedOTP = '123456';

    if (enteredOTP !== hardcodedOTP) {
      throw new Error('Invalid OTP');
    }

    // Update user status or perform any additional logic upon successful OTP verification
    user.isVerified = true;
    await user.save();

    return { message: 'OTP verified successfully' };
  } catch (error) {
    throw error;
  }
};
const loginUser = async (username, password, role) => {
  try {
    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Invalid username or password');
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    // Check if the role matches the one provided during registration
    if (user.role !== role) {
      throw new Error('Role mismatch');
    }

    
    if (!user.isVerified) {
      throw new Error('User is not verified. Please verify OTP.');
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, config.secretKey, {
      expiresIn: '1h',
    });

    return { token };
  } catch (error) {
    throw error;
  }
};

module.exports = { registerUser, loginUser,verifyOTP };
