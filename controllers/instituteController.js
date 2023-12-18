// controllers/instituteController.js
const Institute = require('../models/institute');

const createInstitute = async (req, res) => {
  try {
    const { name } = req.body;
    const newInstitute = new Institute({ name });
    await newInstitute.save();
    res.status(201).json({ status: true, message: 'Institute created successfully', data: newInstitute });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

const getInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.find();
    res.status(200).json({ status: true, data: institutes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

module.exports = { createInstitute, getInstitutes };
