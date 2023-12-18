// models/branch.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  institute: {
    type: Schema.Types.ObjectId,
    ref: 'Institute',
    required: true,
  },
//   adminId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
