const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['offer', 'request'], 
    default: 'request'
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'rejected'],
    default: 'pending' // Services must be approved by admin
  },
  fee: {
    type: Number,
    required: true,
  },
  feeUnit: {
    type: String,
    enum: ['Hour', 'Day', 'Job'],
    required: true,
  },
  preferredTime: {
    type: String,
    required: true,
  },
  preferredDay: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Service", serviceSchema);