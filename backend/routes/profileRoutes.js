const express = require("express");
const { getProfile, updateProfile } = require("../controllers/userController");
const { auth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/me", auth, getProfile);
router.put("/update", auth, updateProfile);

module.exports = router;
