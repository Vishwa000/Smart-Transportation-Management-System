// services/instituteService.js
const Institute = require('../models/institute');

const createInstitute = async (name) => {
  try {
    const newInstitute = new Institute({ name });
    await newInstitute.save();
    return { status: true, message: 'Institute created successfully', data: newInstitute };
  } catch (error) {
    console.error(error);
    return { status: false, message: 'Internal server error' };
  }
};

const getInstitutes = async () => {
  try {
    const institutes = await Institute.find();
    return { status: true, data: institutes };
  } catch (error) {
    console.error(error);
    return { status: false, message: 'Internal server error' };
  }
};

module.exports = { createInstitute, getInstitutes };
