// services/userService.js
const User = require('../models/user');

const getAllPassengers = async () => {
    try{
        const passengers = await User.find({ role: 'passenger' }).select('-password -otp');
        return { status: true, message: 'Passengers retrieved successfully', data: passengers };
    } catch (error) {
        console.error(error);
        return { status: false, message: 'Error retrieving passengers', data: null };
      }
    };


module.exports = {
  getAllPassengers
};
