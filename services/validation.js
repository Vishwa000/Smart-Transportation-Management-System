// services/validation.js
const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    idNumber: Joi.string().regex(/^[a-zA-Z0-9_]{3,30}$/).required(),
    password: Joi.string().pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,30}$/).required(),
    role: Joi.string().valid('admin', 'student', 'driver').required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
    firstName: Joi.string().trim().min(2).max(30),
    lastName: Joi.string().trim().min(2).max(30)
  });

  return schema.validate(data);
};



module.exports = {  registerValidation };
