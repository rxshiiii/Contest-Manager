const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        default: "Other",
    },
    dateOfBirth: {
        type: Date,
        default: null,
    },
    about: {
        type: String,
        trim: true,
        default: "",
    },
    contactNumber: {
        type: String,
        trim: true,
        minlength: 10,
        default: null, // Allow null instead of an empty string
    },
    profilePhoto: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model("Profile", profileSchema);
