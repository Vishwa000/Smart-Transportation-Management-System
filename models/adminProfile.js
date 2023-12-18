const mongoose = require('mongoose');

const adminProfileSchema = new mongoose.Schema({
  employeePid: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const AdminProfile = mongoose.model('AdminProfile', adminProfileSchema);

module.exports = AdminProfile;
