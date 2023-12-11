// routes/usersRoutes.js
const express = require('express');
const driverController = require('../controllers/driverController');
const passengerController = require('../controllers/passengerController');
const router = express.Router();


router.get('/passengers', passengerController.getAllPassengers);
router.get('/drivers', driverController.getAllDrivers);

module.exports = router;
