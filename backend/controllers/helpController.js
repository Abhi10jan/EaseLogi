const HelpMessage = require("../models/helpModel");

// Dummy FAQs and Contact Info
const faqs = [
  {
    question: "How do I track my shipments?",
    answer: "Go to the tracking page and enter your shipment ID.",
  },
  {
    question: "How do I create a new shipment order?",
    answer: "Navigate to the 'New Order' section and fill in the details.",
  },
  {
    question: "Can I update my shipment details after booking?",
    answer: "Yes, you can edit details within 24 hours of booking.",
  },
  {
    question: "How do I contact customer support?",
    answer: "You can email us or call our support number.",
  },
];

const contact = { email: "support@easelogi.com" };

// Get FAQs
exports.getFAQs = (req, res) => res.json(faqs);

// Get Contact Info
exports.getContactInfo = (req, res) => res.json(contact);

// MSME User: Submit Help Message
exports.sendMessage = async (req, res) => {
  try {
    console.log("📩 Received Message Request:", req.body);
    const { message } = req.body;
    const userId = req.user?._id;

    if (!userId)
      return res.status(401).json({ error: "User not authenticated" });
    if (!message.trim())
      return res.status(400).json({ error: "Message cannot be empty" });

    const newMessage = new HelpMessage({ userId, message });
    await newMessage.save();

    console.log("✅ Message Saved:", newMessage);
    res.json({ success: true, message: "Your query has been recorded!" });
  } catch (error) {
    console.error("❌ Error saving message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Admin: Fetch All Messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await HelpMessage.find().populate("userId", "email");
    res.json(messages);
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Admin: Respond to a Query
exports.respondToMessage = async (req, res) => {
  try {
    const { response } = req.body;
    const messageId = req.params.id;

    const helpMessage = await HelpMessage.findById(messageId);
    if (!helpMessage)
      return res.status(404).json({ error: "Message not found" });

    helpMessage.response = response;
    helpMessage.respondedAt = new Date();
    await helpMessage.save();

    res.json({ success: true, message: "Response sent successfully!" });
  } catch (error) {
    console.error("❌ Error responding to message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// MSME User: Fetch Their Queries & Responses
exports.getUserMessages = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId)
      return res.status(401).json({ error: "User not authenticated" });

    const messages = await HelpMessage.find({ userId }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("❌ Error fetching user messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
