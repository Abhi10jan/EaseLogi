const express = require("express");
const router = express.Router();
const helpController = require("../controllers/helpController");
const authMiddleware = require("../middleware/auth.middleware");
const HelpMessage = require("../models/helpmodel");
// Routes
router.get("/faqs", authMiddleware, helpController.getFAQs);
router.get("/contact", authMiddleware, helpController.getContactInfo);
router.post("/send-message", authMiddleware, async (req, res) => {
  try {
    console.log("📩 Received Message Request:", req.body);

    const { message } = req.body;
    const userId = req.user?._id; // Extracted from authMiddleware

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!message.trim()) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    const newMessage = new HelpMessage({ userId, message });
    await newMessage.save();

    console.log("✅ Message Saved:", newMessage);

    res.json({ success: true, message: "Your query has been recorded!" });
  } catch (error) {
    console.error("❌ Error saving message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Fetch all messages (For admin dashboard)
router.get("/messages", authMiddleware, async (req, res) => {
  try {
    const messages = await HelpMessage.find().populate("userId", "email");
    res.json(messages);
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Admin Responds to a Query
router.post("/respond/:id", authMiddleware, async (req, res) => {
  try {
    const { response } = req.body;
    const messageId = req.params.id;

    const helpMessage = await HelpMessage.findById(messageId);
    if (!helpMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    helpMessage.response = response;
    await helpMessage.save();

    res.json({ success: true, message: "Response sent successfully!" });
  } catch (error) {
    console.error("❌ Error responding to message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
