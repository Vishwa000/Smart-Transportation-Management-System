const express = require('express');
const passengerController = require('../controllers/passengerController');
const router = express.Router();

router.get('/passengers', passengerController.getAllPassengers);
router.patch('/passenger/:passengerId', passengerController.updatePassenger);
router.post('/passenger/:passengerId/feedback', passengerController.updatePassengerFeedback);


module.exports = router;