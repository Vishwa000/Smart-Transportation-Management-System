// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['admin', 'passenger', 'driver','superadmin'],
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
  otp: String, // Store OTP in the database
  refreshToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);
