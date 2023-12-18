// controllers/branchController.js
const branchService = require('../services/branchService');

const createBranch = async (req, res) => {
  try {
    const { name, instituteId } = req.body;
    const result = await branchService.createBranch({ name, instituteId });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getBranches = async (req, res) => {
  try {
    const result = await branchService.getBranches();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createBranch,
  getBranches,
};
