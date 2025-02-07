const Shipment = require("../models/Shipment");
const LogisticsService = require("../services/LogisticsService");
const NotificationService = require("../services/notificationService");

exports.createShipment = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const shipment = new Shipment({
      ...req.body,
      msmeId: req.user._id, // Authentication required here
    });

    await shipment.save();

    // Check for aggregation opportunities
    const pendingShipments = await Shipment.find({
      status: "pending",
      aggregated: false,
    });

    if (pendingShipments.length >= 3) {
      await LogisticsService.aggregateShipments(pendingShipments);
    }

    res.status(201).json(shipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find()
      .populate("aggregationGroup")
      .populate("matchedProvider");

    res.json(shipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getShipmentTracking = async (req, res) => {
  try {
    console.log("Request ID:", req.params.id);
    const shipment = await Shipment.findById(req.params.id).populate(
      "trackingUpdates"
    );

    if (!shipment) {
      console.log("Shipment not found!");
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.json(shipment.trackingUpdates);
  } catch (error) {
    console.error("Error fetching tracking:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.aggregateShipments = async (req, res) => {
  try {
    const pendingShipments = await Shipment.find({ status: "pending" });

    if (pendingShipments.length === 0) {
      return res
        .status(404)
        .json({ message: "No pending shipments available for aggregation" });
    }

    const aggregatedLoads = await LogisticsService.aggregateShipments(
      pendingShipments
    );
    res.json({ message: "Shipments aggregated successfully", aggregatedLoads });
  } catch (error) {
    console.error("Error in shipment aggregation:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getMatchedShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find({ aggregated: true })
      .populate("aggregationGroup")
      .populate("matchedProvider");

    console.log("Matched Shipments:", shipments); // Debug log

    res.json(shipments);
  } catch (error) {
    console.error("Error fetching matched shipments:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.assignProviderToLoad = async (req, res) => {
  try {
    const { aggregatedLoadId } = req.body;

    const aggregatedLoad = await AggregatedLoad.findById(aggregatedLoadId);
    if (!aggregatedLoad) {
      return res.status(404).json({ message: "Aggregated load not found" });
    }

    const bestProvider = await LogisticsService.findBestProvider(
      aggregatedLoad
    );
    if (!bestProvider) {
      return res.status(400).json({ message: "No suitable provider found" });
    }

    aggregatedLoad.assignedProvider = bestProvider._id;
    await aggregatedLoad.save();

    res.json({
      message: "Provider assigned successfully",
      provider: bestProvider,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
