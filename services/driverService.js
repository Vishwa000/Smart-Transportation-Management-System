// services/driverService.js
const User = require('../models/user');
const Review = require('../models/review');


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

  const createDriverReview = async (reviewerId, driverId, rating, feedback) => {
    try {
      // Create a new review
      const newReview = await Review.create({
        reviewerId,
        targetId: driverId,
        rating,
        feedback,
      });
  
      // Fetch all reviews for the driver
      const allReviews = await Review.find({ targetId: driverId });
  
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
    getAllDrivers,
    updateDriver,
    createDriverReview,
  };