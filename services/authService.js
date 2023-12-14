// services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/config');
const { registerValidation} = require('./validation');
const { validateEmail} = require('./validationUtils');

const generateOTP = () => {
  const randomOTP = Math.floor(100000 + Math.random() * 900000).toString();
  const timestamp = Date.now(); // Set the timestamp explicitly
  const expirationTime = timestamp + 10 * 1000; // 30s in milliseconds
  return { otp: randomOTP, timestamp: timestamp,expirationTime };
};


const sendOTP = async (user) => {
  try {
    // Ensure that user.otp is defined before attempting to send it
    if (!user.otp) {
      return { status: false, message: 'OTP is undefined' };
    }

    // Implement logic to send the OTP (e.g., send an email or SMS)
    console.log(`Sending OTP ${user.otp} to user ${user.idNumber}`);
    // Replace the above log statement with actual logic to send the OTP (e.g., email or SMS)
  } catch (error) {
    console.error(`Error sending OTP: ${error.message}`);
    return { status: false, message: 'Error sending OTP. Please try again later.' };
  }
};

const isOTPExpired = (otp) => {
  const expirationTime = otp.timestamp + 10 * 1000; // 30s in milliseconds
  return Date.now() > expirationTime;
};

const registerUser = async (idNumber, password, role, email, mobileNumber, firstName, lastName) => {
  // Validate user input using Joi
  const validation = registerValidation({ idNumber, password, role, email, mobileNumber });

  if (validation.error) {
    // Extract the first validation error message
    const errorMessage = validation.error.details[0].message;
  
    // Customize or simplify the message for better user experience
    const fontMessage = 'Registration failed due to validation error. Please check your input.';
  
    return { status: false, message: fontMessage};
  }
  

  // Validate email and mobile number
  const emailValidation = validateEmail(email);
  if (emailValidation.error) {
    return { status: false, message: 'Invalid email format' };
  }

  const mobileNumberValidation = validateMobileNumber(mobileNumber);
  if (mobileNumberValidation.error) {
    return { status: false, message: 'Invalid mobile number format' };
  }

  try {
    const existingUser = await User.findOne({ idNumber });
    if (existingUser) {
      return { status: false, message: 'idNumber already exists' };
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return { status: false, message: 'email already exists' };
    }

    const existingMobileNumber = await User.findOne({ mobileNumber });
    if (existingMobileNumber) {
      return { status: false, message: 'mobileNumber already exists' };
    }

    const existingFirstName = await User.findOne({ firstName });
    if (existingFirstName) {
      return { status: false, message: 'firstName already exists' };
    }

    const existingLastName = await User.findOne({ lastName });
    if (existingLastName) {
      return { status: false, message: 'lastName already exists' };
    }



    const hashedPassword = await bcrypt.hash(password, 10);
    const { otp, timestamp,expirationTime } = generateOTP();
    
    const newUser = new User({
      idNumber,
      password: hashedPassword,
      role,
      email,
      mobileNumber,
      otp,
      otpTimestamp: timestamp,
      otpExpirationTime: expirationTime,
      firstName,
      lastName
    });

    await newUser.save();
    await sendOTP(newUser);

    return { status:true, message: 'User registered successfully. OTP sent.' };
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return { status:false, message: 'Registration failed. Please try again later.' };
  }
};

const verifyOTP = async (idNumber, enteredOTP) => {
  try {
    const user = await User.findOne({ idNumber });
    if (!user) {
      return { status: false, message: 'Invalid idNumber' };
    }

    if (isOTPExpired(user.otp)) {
      // Regenerate OTP if expired
      const { otp, timestamp } = generateOTP();
      user.otp = otp;
      user.otpTimestamp = timestamp;
      await user.save();
      await sendOTP(user);

      return { status: false, message: 'OTP expired. New OTP sent.' };
    }

    if (enteredOTP !== user.otp) {
      return { status: false, message: 'Invalid OTP' };
    }

    // Update user status or perform any additional logic upon successful OTP verification
    user.isVerified = true;
    await user.save();

    return { status: true, message: 'OTP verified successfully' };
  } catch (status) {
    return { status: false, message: 'OTP verification failed. Please try again later.' };
  }
};

const resendOTP = async (idNumber) => {
  try {
    const user = await User.findOne({ idNumber });
    if (!user) {
      return { status: 'Invalid idNumber' };
    }

    const { otp, timestamp,expirationTime } = generateOTP();
    user.otp = otp;
    user.otpTimestamp = timestamp;
    user.otpExpirationTime = expirationTime; // Set the new expiration time
    await user.save();
    await sendOTP(user);

    return { status:true, message: 'New OTP sent successfully.' };
  } catch (error) {
    return { status: false, message: 'Error resending OTP. Please try again later.' };
  }
};


module.exports = { registerUser, verifyOTP, resendOTP };
