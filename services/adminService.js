const User = require('../models/user');

const getAllAdmin = async () => {
    try {
      const admins = await User.find({ role: 'admin' }).select('-password -otp');
      return { status: true, message: 'Admin retrieved successfully', data: admins };
    } catch (error) {
      console.error(error);
      return { status: false, message: 'Error retrieving admins', data: null };
    }
  };


const updateAdmin = async (adminId, newData) => {
  try {
      const updatedAdmin = await User.findByIdAndUpdate(adminId, newData, { new: true, runValidators: true }).select('-password -otp ');

      if (!updatedAdmin) {
          return { status: false, message: 'Admin not found', data: null };
      }

      return { status: true, message: 'Admin updated successfully', data: updatedAdmin };
  } catch (error) {
      console.error(error);
      return { status: false, message: 'Error updating admin', data: null };
  }
};
  module.exports = {
    getAllAdmin,
    updateAdmin,
  };