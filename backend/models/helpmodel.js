const mongoose = require("mongoose");

const HelpMessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  response: { type: String, default: null }, // Will be updated once admin replies
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HelpMessage", HelpMessageSchema);
