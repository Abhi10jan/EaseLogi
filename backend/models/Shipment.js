// models/Shipment.js
const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  msmeId: { type: mongoose.Schema.Types.ObjectId, ref: "MSME", required: true },

  // Contact Information
  contactInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    companyName: { type: String, required: true },
  },

  // Origin Information
  origin: {
    companyName: { type: String, required: true },
    desiredPickupTime: { type: String, required: true },
    address: { type: String, required: true },
    cityState: { type: String, required: true },
    zipCode: { type: String, required: true },
    contactName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    asapPickup: { type: Boolean, default: false },
  },

  // Destination Information
  destination: {
    companyName: { type: String, required: true },
    desiredDeliveryTime: { type: String, required: true },
    address: { type: String, required: true },
    cityState: { type: String, required: true },
    zipCode: { type: String, required: true },
    contactName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    asapDelivery: { type: Boolean, default: false },
  },

  // Shipment Information
  shipmentDetails: {
    numberOfItems: { type: Number, required: true },
    packagingType: { type: String, required: true },
    itemDimensions: { type: String, required: true }, // Format: "LxWxH inches"
    totalWeight: { type: Number, required: true }, // lbs
    commodity: { type: String, required: true },
    deliveryRequirements: {
      dockHighVehicleRequired: { type: Boolean, default: false },
      hazmat: { type: Boolean, default: false },
      liftGateRequired: { type: Boolean, default: false },
    },
    specialRequirements: { type: String },
  },

  // Status & Tracking
  status: {
    type: String,
    enum: ["pending", "aggregated", "matched", "in_transit", "delivered"],
    default: "pending",
  },
  aggregated: { type: Boolean, default: false },
  aggregationGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AggregatedLoad",
  },
  matchedProvider: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
  price: Number,
  createdAt: { type: Date, default: Date.now },
  expectedDeliveryDate: Date,
  actualDeliveryDate: Date,
  rating: Number,
  trackingUpdates: [
    {
      status: String,
      location: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Shipment", shipmentSchema);
