// services/branchService.js
const Branch = require('../models/branch');

const createBranch = async (branchData) => {
  try {
    const { name, instituteId } = branchData;
    const newBranch = new Branch({ name, institute: instituteId });
    await newBranch.save();
    
// Fetch all branches for the institute after creating a new branch
    const branches = await Branch.find({ institute: instituteId });


    return { status: true, message: 'Branch created successfully', data: branches };
  } catch (error) {
    console.error(error);
    return { status: false, message: 'Internal server error' };
  }
};

const getBranches = async () => {
  try {
    const branches = await Branch.find();
    return { status: true, data: branches };
  } catch (error) {
    console.error(error);
    return { status: false, message: 'Internal server error' };
  }
};

module.exports = { createBranch, getBranches };
