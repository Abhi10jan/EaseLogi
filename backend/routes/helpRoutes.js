const express = require("express");
const router = express.Router();
const helpController = require("../controllers/helpController");
const authMiddleware = require("../middleware/auth.middleware");

// Public Routes
router.get("/faqs", helpController.getFAQs);
router.get("/contact", helpController.getContactInfo);

// MSME User Routes (Auth Required)
router.post("/send-message", authMiddleware, helpController.sendMessage);
router.get("/user-messages", authMiddleware, helpController.getUserMessages);

// Admin Routes (Auth Required)
router.get("/messages", authMiddleware, helpController.getMessages);
router.post("/respond/:id", authMiddleware, helpController.respondToMessage);

module.exports = router;
