// controllers/driverController.js
const driverService = require('../services/driverService');

const getAllDrivers = async (req, res) => {
    try {
      const drivers = await driverService.getAllDrivers();
      res.status(200).json(drivers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const updateDriver = async (req, res) => {
    try {
        const { driverId } = req.params;
        const newData = req.body;

        const result = await driverService.updateDriver(driverId, newData);

        if (!result.status) {
            return res.status(404).json({ error: result.message });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createDriverReview = async (req, res) => {
  try {
    const { driverId } = req.params;
    const { reviewerId, rating, feedback } = req.body;

    const result = await driverService.createDriverReview(reviewerId, driverId, rating, feedback);

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
    getAllDrivers,
    updateDriver,
    createDriverReview,
  };
  