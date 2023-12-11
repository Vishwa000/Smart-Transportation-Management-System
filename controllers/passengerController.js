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



module.exports = {
  getAllPassengers,
 
};
