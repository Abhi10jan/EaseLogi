const mongoose = require("mongoose");

const HelpMessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  response: { type: String, default: null }, // Admin's response
  createdAt: { type: Date, default: Date.now },
  respondedAt: { type: Date, default: null }, // Timestamp for response
});

module.exports = mongoose.model("HelpMessage", HelpMessageSchema);
