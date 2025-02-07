// models/AggregatedLoad.js
const mongoose = require("mongoose");

const aggregatedLoadSchema = new mongoose.Schema({
  shipments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shipment" }],
  totalWeight: Number,
  totalVolume: Number,
  optimizedRoute: [
    {
      location: String,
      sequence: Number,
      estimatedArrival: Date,
    },
  ],
  status: {
    type: String,
    enum: ["pending", "assigned", "in_transit", "completed"],
    default: "pending",
  },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
  totalPrice: Number,
});

module.exports = mongoose.model("AggregatedLoad", aggregatedLoadSchema);
