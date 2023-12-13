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

  const updateDriver = async (driverId, newData) => {
    try {
        const updatedDriver = await User.findByIdAndUpdate(driverId, newData, { new: true, runValidators: true }).select('-password -otp ');
  
        if (!updatedDriver) {
            return { status: false, message: 'Driver not found', data: null };
        }
  
        return { status: true, message: 'Driver updated successfully', data: updatedDriver };
    } catch (error) {
        console.error(error);
        return { status: false, message: 'Error updating driver', data: null };
    }
  };

  const updateDriverFeedback = async (driverId, passengerId, feedback, rating) => {
    try {
      const driver = await User.findById(driverId);
  
      if (!driver) {
        return { status: false, message: 'Driver not found', data: null };
      }
  
      // Check if the passenger already provided feedback
      const existingFeedback = driver.driverFeedback.find((item) => item.passengerId.toString() === passengerId.toString());
  
      if (existingFeedback) {
        // Update existing feedback
        existingFeedback.feedback = feedback;
        existingFeedback.rating = rating;
      } else {
        // Add new feedback
        driver.driverFeedback.push({
          passengerId,
          feedback,
          rating,
        });
      }
  
      await driver.save();
  
      return { status: true, message: 'Feedback and rating submitted successfully', data: driver.driverFeedback };
    } catch (error) {
      console.error(error);
      return { status: false, message: 'Error submitting feedback and rating', data: null };
    }
  };
  
  module.exports = {
    getAllDrivers,
    updateDriver,
    updateDriverFeedback,
  };