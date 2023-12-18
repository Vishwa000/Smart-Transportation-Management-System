// routes/branchRoutes.js
const express = require('express');
const branchController = require('../controllers/branchController');
const router = express.Router();

router.post('/create', branchController.createBranch);
router.get('/get', branchController.getBranches);

module.exports = router;
