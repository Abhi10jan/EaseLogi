// controllers/providerController.js
const Provider = require("../models/Provider");
const AggregatedLoad = require("../models/AggregatedLoad");
const Shipment = require("../models/Shipment");

exports.getLoadBoard = async (req, res) => {
  try {
    const loads = await AggregatedLoad.find({ status: "pending" }).populate(
      "shipments"
    );

    res.json(loads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.acceptLoad = async (req, res) => {
  try {
    const { loadId } = req.params;
    const providerId = req.user._id;

    const load = await AggregatedLoad.findById(loadId);
    if (!load) {
      return res.status(404).json({ message: "Load not found" });
    }

    load.provider = providerId;
    load.status = "assigned";
    await load.save();

    // Update all shipments in the aggregated load
    await Shipment.updateMany(
      { aggregationGroup: loadId },
      {
        status: "matched",
        matchedProvider: providerId,
      }
    );

    // Update provider's active loads
    await Provider.findByIdAndUpdate(providerId, {
      $push: { activeLoads: loadId },
    });

    res.json(load);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { loadId } = req.params;
    const { status, location } = req.body;

    const load = await AggregatedLoad.findById(loadId);
    if (!load) {
      return res.status(404).json({ message: "Load not found" });
    }

    // Update load status
    load.status = status;
    if (status === "completed") {
      load.completedAt = new Date();
    }
    await load.save();

    // Update all shipments in the load
    await Shipment.updateMany(
      { aggregationGroup: loadId },
      {
        $push: {
          trackingUpdates: {
            status,
            location,
            timestamp: new Date(),
          },
        },
      }
    );

    res.json(load);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
