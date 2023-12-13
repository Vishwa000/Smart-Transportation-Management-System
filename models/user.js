// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['admin', 'passenger', 'driver'],
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
  driverFeedback: [
    {
      passengerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      feedback: String,
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
  ],
  passengerFeedback: [
    {
      driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      feedback: String,
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
  ],
  
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);
