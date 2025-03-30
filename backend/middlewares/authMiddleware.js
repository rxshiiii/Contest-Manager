// Importing required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

// Configuring dotenv to load environment variables from .env file
dotenv.config();

// Middleware to authenticate user requests
exports.auth = async (req, res, next) => {
	try {
		// Extract JWT from header, cookies, or body
		const token =
			req.cookies?.token ||
			req.body?.token ||
			(req.header("Authorization")?.startsWith("Bearer ")
				? req.header("Authorization").replace("Bearer ", "")
				: null);

		// Debugging: Log token received
		console.log("🔍 Received Token:", token);

		// If JWT is missing, return 401 Unauthorized response
		if (!token) {
			console.log("❌ Token Missing");
			return res.status(401).json({ success: false, message: "Token Missing" });
		}

		try {
			// Verify JWT
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			console.log("✅ Decoded Token:", decoded);

			// Find user by ID (excluding password)
			req.user = await User.findById(decoded.id).select("-password");

			if (!req.user) {
				console.log("❌ User Not Found");
				return res.status(404).json({ success: false, message: "User not found" });
			}
		} catch (error) {
			console.log("❌ Invalid Token:", error.message);
			return res.status(401).json({ success: false, message: "Invalid Token" });
		}

		// If JWT is valid, proceed to the next middleware
		next();
	} catch (error) {
		console.log("❌ Error Validating Token:", error.message);
		return res.status(500).json({
			success: false,
			message: "Error validating the token",
		});
	}
};

// Middleware for Student-only routes
exports.isStudent = async (req, res, next) => {
	try {
		if (req.user.accountType !== "Student") {
			return res.status(403).json({
				success: false,
				message: "Access Denied: Students only",
			});
		}
		next();
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error verifying user role",
		});
	}
};

// Middleware for Admin-only routes
exports.isAdmin = async (req, res, next) => {
	try {
		if (req.user.accountType !== "Admin") {
			return res.status(403).json({
				success: false,
				message: "Access Denied: Admins only",
			});
		}
		next();
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error verifying user role",
		});
	}
};
