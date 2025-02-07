const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    console.log(
      "🔹 JWT_SECRET from .env:",
      process.env.JWT_SECRET || "NOT SET"
    );

    const authHeader = req.header("Authorization");
    console.log("🔹 Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ Invalid Authorization header format.");
      return res
        .status(401)
        .json({ error: "Access denied. Invalid token format." });
    }

    // Extract Token
    const token = authHeader.split(" ")[1];
    console.log("🔹 Extracted Token:", token);

    if (!token) {
      console.log("❌ No token provided.");
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token:", decoded);

    // Ensure decoded token contains a valid user ID
    if (!decoded.userId && !decoded.id) {
      console.log("❌ Token missing userId or id.");
      return res.status(401).json({ error: "Invalid token structure." });
    }

    // Find User
    req.user = await User.findById(decoded.userId || decoded.id).select(
      "-password"
    );
    console.log("🔹 User Found in DB:", req.user);

    if (!req.user) {
      console.log("❌ User not found in the database.");
      return res.status(401).json({ error: "Invalid token. User not found." });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("❌ Error in authMiddleware:", error.message);

    // Handle JWT-specific errors
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token expired. Please log in again." });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ error: "Invalid token. Please log in again." });
    }

    res.status(401).json({ error: "Unauthorized access." });
  }
};

module.exports = authMiddleware;
