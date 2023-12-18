// controllers/passengerController.js
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

const createPassengerReview = async (req, res) => {
  try {
    const { passengerId } = req.params;
    const { reviewerId, rating, feedback } = req.body;

    const result = await passengerService.createPassengerReview(reviewerId, passengerId, rating, feedback);

    if (!result.status) {
      return res.status(400).json({ error: result.message });
    }

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
  getAllPassengers,
  updatePassenger,
  createPassengerReview,
  
};
