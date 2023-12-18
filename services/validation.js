// services/validation.js
const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    personalId: Joi.string().regex(/^[a-zA-Z0-9_]{3,30}$/),
    role: Joi.string().valid('admin', 'student', 'driver').required(),
    mobileNumber: Joi.string().pattern(new RegExp('^[0-9]{10}$')),
    firstName: Joi.string().trim().min(2).max(30),
    lastName: Joi.string().trim().min(2).max(30)
  });

  return schema.validate(data);
};
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,30}$/).required(),
    role: Joi.string().valid('admin', 'student', 'driver').required(),
  });

  return schema.validate(data);
};


module.exports = {  registerValidation, loginValidation};
