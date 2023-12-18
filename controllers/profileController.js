// controllers/profileController.js
const profileService = require('../services/profileService');
const getProfile = async (req, res) => {
  try {
    const profileData = await profileService.getProfileData(req.user.id);
    res.status(200).json({ status: true, message: 'Profile retrieved successfully', data: profileData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error retrieving profile', data: null });
  }
};

const updateProfile = async (req, res) => {
  try {
    const newData = req.body; // Assuming the updated data is sent in the request body
    const updatedProfile = await profileService.updateProfile(req.user.id, newData);

    res.status(200).json({ status: true, message: 'Profile updated successfully', data: updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error updating profile', data: null });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
