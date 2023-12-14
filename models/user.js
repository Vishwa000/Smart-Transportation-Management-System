// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  idNumber: String,
  password: String,
  role: {
    type: String,
    enum: ['admin', 'student', 'driver'],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  otpTimestamp: {
    type: Number, // Make sure to declare this as a Number type
    required: true,
  },// Store OTP in the database
  
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', userSchema);
