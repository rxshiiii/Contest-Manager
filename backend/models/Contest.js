const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema(
    {
        contestName: {
            type: String,
            required: true,
            trim: true
        },
        contestDescription: {
            type: String,
            required: true
        },
        contestThumbnail: { 
            type: String,
            required: true
        },
        platform: {
            type: String,
            required: true,
            enum: ["HackerRank", "HackerEarth", "LeetCode", "CodeForces", "CodeChef", "AtCoder"]
        },
        contestLink: {
            type: String,
            required: true,
            match: [/^https?:\/\/.+/, "Invalid contest link"] // Ensures valid URL
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    },
    { timestamps: true } 
);

module.exports = mongoose.model("Contest", contestSchema);
