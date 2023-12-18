const User = require('../models/user');
const AdminProfile = require('../models/adminProfile');
const StudentProfile = require('../models/studentProfile');
const DriverProfile = require('../models/driverProfile');
const Branch = require('../models/branch');
const Institute = require('../models/institute');
const otpService = require('./otpService');

exports.registerUser = async ({ mobileNumber, role, firstName, lastName, pid, userOTP }) => {
  try {
    // Replace with the actual branchId and instituteId
    const branchId = '6580ad59c65c5e22ae5c4ee0';
    const instituteId = '6580a82c122bd5ed4aa43f5a';

    // Check if the Branch with the provided branchId belongs to the specified Institute
    const branch = await Branch.findOne({ _id: branchId }).exec();
    const institute = await Institute.findOne({ _id: instituteId }).exec();

    if (!branch || !institute) {
      return { success: false, message: 'Invalid institute or branch ID.' };
    }

    let userProfile;

    switch (role) {
      case 'admin':
        userProfile = new AdminProfile({
          employeePid: pid,
          firstName,
          lastName,
          instituteId,
          branchId,
        });
        break;
      case 'student':
        userProfile = new StudentProfile({
          studentPid: pid,
          firstName,
          lastName,
          instituteId,
          branchId,
        });
        break;
      case 'driver':
        userProfile = new DriverProfile({
          driverPid: pid,
          firstName,
          lastName,
          instituteId,
          branchId,
        });
        break;
      default:
        return { success: false, message: 'Invalid role.' };
    }

    await userProfile.save();

    const user = new User({
      mobileNumber,
      role,
      [`${role}Profile`]: userProfile._id,
    });

    await user.save();

    // Verify hardcoded OTP
    const isOTPVerified = otpService.verifyOTP(userOTP, '');

    if (!isOTPVerified) {
      return { success: false, message: 'OTP verification failed.' };
    }

    return { success: true, message: 'Registration successful. OTP verified.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Registration failed.' };
  }
};
