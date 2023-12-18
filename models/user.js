const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'student', 'driver'],
  },
  adminProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminProfile' },
  studentProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentProfile' },
  driverProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'DriverProfile' },
  OTP: { type: String },  // Add the OTP field
  isVerified: { type: Boolean, default: false },  // Add the isVerified field
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const User = mongoose.model('User', userSchema);

module.exports = User;
