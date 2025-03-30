const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { connect } = require("./config/database");

// Load environment variables
dotenv.config();

const app = express();

// ✅ Proper CORS Configuration
app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend to access API
    credentials: true, // Allow cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ Connect to Database
connect();

// ✅ Importing Routes
const authRoutes = require("./routes/authRoutes");
const contestRoutes = require("./routes/contestRoutes");
const profileRoutes = require("./routes/profileRoutes");

// ✅ Use Routes with Namespaces
app.use("/api/auth", authRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/profile", profileRoutes);

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
