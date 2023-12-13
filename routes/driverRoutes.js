const express = require('express');
const driverController = require('../controllers/driverController');
const router = express.Router();


router.get('/drivers', driverController.getAllDrivers);
router.patch('/driver/:driverId', driverController.updateDriver);
router.post('/driver/:driverId/feedback', driverController.updateDriverFeedback);


module.exports = router;