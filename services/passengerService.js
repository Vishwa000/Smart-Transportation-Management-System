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

    const updatePassenger = async (passengerId, newData) => {
      try {
          const updatedPassenger = await User.findByIdAndUpdate(passengerId, newData, { new: true, runValidators: true }).select('-password -otp ');
    
          if (!updatedPassenger) {
              return { status: false, message: 'Passenger not found', data: null };
          }
    
          return { status: true, message: 'Passenger updated successfully', data: updatedPassenger };
      } catch (error) {
          console.error(error);
          return { status: false, message: 'Error updating passenger', data: null };
      }
    };

    const updatePassengerFeedback = async (passengerId, driverId, feedback, rating) => {
      try {
        const passenger = await User.findById(passengerId);
    
        if (!passenger) {
          return { status: false, message: 'Passenger not found', data: null };
        }
    
        // Check if the driver already provided feedback
        const existingFeedback = passenger.passengerFeedback.find((item) => item.driverId.toString() === driverId.toString());
    
        if (existingFeedback) {
          // Update existing feedback
          existingFeedback.feedback = feedback;
          existingFeedback.rating = rating;
        } else {
          // Add new feedback
          passenger.passengerFeedback.push({
            driverId,
            feedback,
            rating,
          });
        }
    
        await passenger.save();
    
        return { status: true, message: 'Feedback and rating submitted successfully', data: passenger.passengerFeedback };
      } catch (error) {
        console.error(error);
        return { status: false, message: 'Error submitting feedback and rating', data: null };
      }
    };

module.exports = {
  getAllPassengers,
  updatePassenger,
  updatePassengerFeedback,
};
