// services/passengerService.js
const User = require('../models/user');
const Review = require('../models/review');


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

    const createPassengerReview = async (reviewerId, passengerId, rating, feedback) => {
      try {
        // Create a new review
        const newReview = await Review.create({
          reviewerId,
          targetId: passengerId,
          rating,
          feedback,
        });
    
        // Fetch all reviews for the passenger
        const allReviews = await Review.find({ targetId: passengerId });
    
        // Calculate the average rating
        const totalRatings = allReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRatings / allReviews.length;
    
            // Generate a summary object with total count
    const feedbackSummary = {
      totalReviews: allReviews.length,
      totalRatings,
      averageRating,
    };
        // Calculate average percentage and update the new review in the database
        const averagePercentage = (averageRating / 5) * 100;
        await Review.findByIdAndUpdate(newReview._id, { averagePercentage }, { new: true, runValidators: true });
    
        return {
          status: true,
          message: 'Review created successfully',
          data: {
            allReviews,
            averageRating,
            averagePercentage,
            feedbackSummary,
          },
        };
      } catch (error) {
        console.error(error);
        return { status: false, message: 'Error creating review', data: null };
      }
    };
    
    

module.exports = {
  getAllPassengers,
  updatePassenger,
  createPassengerReview,
};
