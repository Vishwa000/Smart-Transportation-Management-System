const registrationService = require('../services/registrationService');

exports.registerUser = async (req, res) => {
  const { mobileNumber, role, firstName, lastName, branchId, instituteId, pid, userOTP } = req.body;
  
  const result = await registrationService.registerUser({
    mobileNumber,
    role,
    firstName,
    lastName,
    branchId,
    instituteId,
    pid,
    userOTP,
  });

  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
};
