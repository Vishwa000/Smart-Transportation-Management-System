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
  
  module.exports = {
    getAllDrivers
  };
  