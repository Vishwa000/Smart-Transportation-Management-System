// services/validationUtils.js
const Joi = require('joi');

const validateEmail = (email) => {
  const schema = Joi.string().email().required();
  return schema.validate(email);
};

const validateMobileNumber = (mobileNumber) => {
  const schema = Joi.string().pattern(new RegExp('^[0-9]{10}$')).required();
  return schema.validate(mobileNumber);
};

module.exports = { validateEmail, validateMobileNumber };
