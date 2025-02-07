// models/Provider.js
const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  vehicles: [
    {
      type: { type: String, required: true },
      capacity: { weight: Number, volume: Number },
      registrationNumber: String,
      available: { type: Boolean, default: true },
    },
  ],
  currentLocation: String,
  rating: { type: Number, default: 0 },
  totalTrips: { type: Number, default: 0 },
  activeLoads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shipment" }],
  documents: {
    license: String,
    insurance: String,
    vehicleRegistration: String,
  },
  paymentDetails: {
    bankAccount: String,
    ifscCode: String,
    accountHolder: String,
  },
});

module.exports = mongoose.model("Provider", providerSchema);
