require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const msmeRoutes = require("./routes/msmeRoutes");
const providerRoutes = require("./routes/providerRoutes");
const helpRoutes = require("./routes/helpRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.get("/", (req, res) => res.send("Welcome to the backend!"));

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend origin
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/msme", msmeRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/help", helpRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
