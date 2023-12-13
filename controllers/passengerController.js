// controllers/usersController.js
const passengerService = require('../services/passengerService');

const getAllPassengers = async (req, res) => {
  try {
    const passengers = await passengerService.getAllPassengers();
    res.status(200).json(passengers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updatePassenger = async (req, res) => {
  try {
      const { passengerId } = req.params;
      const newData = req.body;

      const result = await passengerService.updatePassenger(passengerId, newData);

      if (!result.status) {
          return res.status(404).json({ error: result.message });
      }

      res.status(200).json(result);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const updatePassengerFeedback = async (req, res) => {
  try {
    const { passengerId } = req.params;
    const { driverId, feedback, rating } = req.body;

    const result = await passengerService.updatePassengerFeedback(passengerId, driverId, feedback, rating);

    if (!result.status) {
      return res.status(404).json({ error: result.message });
    }

    res.status(200).json({ feedback: result.data, averageRating: calculateAverageRating(result.data) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Helper function to calculate average rating
const calculateAverageRating = (feedbackArray) => {
  const totalRating = feedbackArray.reduce((sum, feedback) => sum + feedback.rating, 0);
  const averageRating = totalRating / feedbackArray.length;
  return averageRating;
};

module.exports = {
  getAllPassengers,
  updatePassenger,
  updatePassengerFeedback,
 
};
