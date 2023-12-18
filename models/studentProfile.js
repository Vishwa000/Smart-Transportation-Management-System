const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  studentPid: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);

module.exports = StudentProfile;
