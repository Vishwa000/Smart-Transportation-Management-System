const User = require('../models/user');

const getAllDrivers = async () => {
    try {
      const drivers = await User.find({ role: 'driver' }).select('-password -otp');
      return { status: true, message: 'Drivers retrieved successfully', data: drivers };
    } catch (error) {
      console.error(error);
      return { status: false, message: 'Error retrieving drivers', data: null };
    }
  };

  module.exports = {
    getAllDrivers,
  };