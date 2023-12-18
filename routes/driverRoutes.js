// routes/driverRoutes.js
const express = require('express');
const driverController = require('../controllers/driverController');
const router = express.Router();


router.get('/driver', driverController.getAllDrivers);
router.patch('/driver/:driverId', driverController.updateDriver);
router.post('/driver/:driverId/reviews', driverController.createDriverReview);

module.exports = router;