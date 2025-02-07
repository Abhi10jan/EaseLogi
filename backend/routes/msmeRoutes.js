// routes/msmeRoutes.js
const express = require("express");
const router = express.Router();
const msmeController = require("../controllers/msmeController");
const auth = require("../middleware/auth.middleware");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/shipments", authMiddleware, msmeController.createShipment);
router.get("/shipments", msmeController.getShipments);
router.get("/shipments/:id/tracking", msmeController.getShipmentTracking);
// Route to aggregate shipments
router.post("/aggregate-shipments", msmeController.aggregateShipments);

// Route to fetch matched shipments
router.get("/matched-shipments", msmeController.getMatchedShipments);

// Route to assign provider to aggregated load
router.post("/assign-provider", msmeController.assignProviderToLoad);

module.exports = router;
