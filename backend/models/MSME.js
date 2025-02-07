// models/MSME.js
const mongoose = require("mongoose");

const msmeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  businessType: String,
  gstin: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MSME", msmeSchema);
