const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Please enter a valid email"
            ]
        },
        password: {
            type: String,
            required: true,
            minlength: 4
        },
        accountType: {
            type: String,
            enum: ["Admin", "Student"],
            default: "Student", // Default set to Student
        },
        interestedContests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Contest'
            }
        ],
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile', // Linking User to Profile
        }
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model("User", userSchema);

