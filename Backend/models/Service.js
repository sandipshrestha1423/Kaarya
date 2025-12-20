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
    enum: ['offer', 'request'], // offer = I can do X, request = I need X
    default: 'request'
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
    type: String, // e.g., "Morning", "9AM-5PM"
    required: true,
  },
  preferredDay: {
    type: String, // e.g., "Weekends", "Monday"
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
