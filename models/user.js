// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['admin', 'passenger', 'driver'],
    default: undefined, // Set default to undefined
  },
  otp: String, // Store OTP in the database
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', userSchema);
