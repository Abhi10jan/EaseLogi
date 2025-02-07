const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.userId && !decoded.id)
      return res.status(401).json({ error: "Invalid token structure" });

    req.user = await User.findById(decoded.userId || decoded.id).select(
      "-password"
    );
    if (!req.user) return res.status(401).json({ error: "User not found" });

    next();
  } catch (error) {
    console.error("❌ Error in authMiddleware:", error.message);

    if (error.name === "TokenExpiredError")
      return res
        .status(401)
        .json({ error: "Token expired. Please log in again." });
    if (error.name === "JsonWebTokenError")
      return res
        .status(401)
        .json({ error: "Invalid token. Please log in again." });

    res.status(401).json({ error: "Unauthorized access." });
  }
};

module.exports = authMiddleware;
