const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
require("dotenv").config();

// Signup Controller
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, accountType } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
       
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists. Please log in." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Creating profile...");
        const profile = await Profile.create({
            gender: "Other",
            dateOfBirth: null,
            about: "",
            contactNumber: null, // Set null to avoid validation error
            profilePhoto: "",
        });

        console.log("Creating user with data:", { firstName, lastName, email, hashedPassword, accountType });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType: accountType || "Student",
            intrestedContest: [],
            profile: profile._id,
        });

        console.log("User created successfully:", user);
        res.status(201).json({ success: true, user, message: "User signed up successfully" });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ success: false, message: `Error signing up user: ${error.message}` });
    }
};

// Login Controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await User.findOne({ email }).populate("profile");
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found. Please sign up." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        // Generate Token
        const token = jwt.sign(
            { id: user._id, role: user.accountType },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        // Remove password before sending response
        const userWithoutPassword = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accountType: user.accountType,
            interestedContests: user.interestedContests,
            profile: user.profile,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            token, // ✅ Token added inside user object
        };

        // Set token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        });

        res.status(200).json({
            success: true,
            user: userWithoutPassword, // ✅ Send user without password
            message: "Login successful",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error logging in" });
    }
};


exports.logout = async (req, res) => {
    try {
        res.clearCookie("token"); // Remove token from cookies
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error logging out" });
    }
};