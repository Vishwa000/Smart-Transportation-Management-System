// routes/instituteRoutes.js
const express = require('express');
const instituteController = require('../controllers/instituteController');
const router = express.Router();

router.post('/create', instituteController.createInstitute);
router.get('/get', instituteController.getInstitutes);

module.exports = router;
