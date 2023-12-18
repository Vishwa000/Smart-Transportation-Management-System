const speakeasy = require('speakeasy');

// Hardcoded OTP for demonstration purposes
const hardcodedOTP = '123456';

exports.generateOTP = () => {
  return hardcodedOTP;
};

exports.generateTOTP = (secret) => {
  return speakeasy.totp({
    secret: secret,
    encoding: 'base32',
  });
};

exports.verifyOTP = (userOTP, secret) => {
  // Hardcoded verification for demonstration purposes
  return userOTP === hardcodedOTP;
};
