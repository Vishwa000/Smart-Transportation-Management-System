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

const updateDriverFeedback = async (req, res) => {
  try {
    const { driverId } = req.params;
    const { passengerId, feedback, rating } = req.body;

    const result = await driverService.updateDriverFeedback(driverId, passengerId, feedback, rating);

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
    getAllDrivers,
    updateDriver,
    updateDriverFeedback,
    
  };
  