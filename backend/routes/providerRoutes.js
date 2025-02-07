// routes/providerRoutes.js
const express = require("express");
const router = express.Router();
const providerController = require("../controllers/providerController");
const auth = require("../middleware/auth.middleware");

router.get("/loadboard", auth, providerController.getLoadBoard);
router.post("/loads/:loadId/accept", auth, providerController.acceptLoad);
router.put(
  "/loads/:loadId/status",
  auth,
  providerController.updateDeliveryStatus
);

module.exports = router;
