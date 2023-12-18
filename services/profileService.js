// services/profileService.js
const User = require('../models/user');
const Review = require('../models/review');
const Profile = require('../models/profile');
const { calculateAverageRating, extractFeedback } = require('../utils/ratingUtils');

const getProfileData = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password -otp -refreshToken');
    const reviews = await Review.find({ targetId: userId });

    const profileData = {
      userId: user._id,
      username: user.username,
      email: user.email,
      phoneNumber: user.mobileNumber,
      role: user.role,
    };

    if (user.role === 'driver' || user.role === 'passenger') {
      profileData.rating = calculateAverageRating(reviews);
      profileData.feedback = extractFeedback(reviews);
      // Add other fields specific to drivers and passengers
      // ...
    }

    return profileData;
  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving profile data');
  }
};

const updateProfile = async (userId, newData) => {
  try {
    // Assuming you have a separate function to update the profile
    // Here you can update the profile based on the newData
    const updatedProfile = await Profile.findOneAndUpdate({ userId: userId }, newData, { new: true, upsert: true });
    return updatedProfile;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating profile');
  }
};

module.exports = {
  getProfileData,
  updateProfile,
};
