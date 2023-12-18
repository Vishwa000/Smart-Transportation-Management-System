// routes/passengerRoutes.js
const express = require('express');
const passengerController = require('../controllers/passengerController');
const router = express.Router();

router.get('/passenger', passengerController.getAllPassengers);
router.patch('/passenger/:passengerId', passengerController.updatePassenger);
router.post('/passenger/:passengerId/reviews', passengerController.createPassengerReview);


module.exports = router;