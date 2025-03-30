const Contest = require("../models/Contest");
const User = require("../models/User"); // Required for toggleInterestedContest

// Create a Contest (Admin only)
exports.createContest = async (req, res) => {
    try {
        const { contestName, contestDescription, contestThumbnail, platform, contestLink, startDate, endDate } = req.body;

        // Validate required fields
        if (!contestName || !contestDescription || !contestThumbnail || !platform || !contestLink || !startDate || !endDate) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Create new contest
        const newContest = await Contest.create({ contestName, contestDescription, contestThumbnail, platform, contestLink, startDate, endDate });

        res.status(201).json({ success: true, contest: newContest, message: "Contest created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating contest" });
    }
};

// Get all contests
exports.getAllContests = async (req, res) => {
    try {
        const contests = await Contest.find();

        res.status(200).json({ success: true, contests });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching contests" });
    }
};

// Get contest by ID
exports.getContestById = async (req, res) => {
    try {
        const contest = await Contest.findById(req.params.id);

        if (!contest) {
            return res.status(404).json({ success: false, message: "Contest not found" });
        }

        res.status(200).json({ success: true, contest });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching contest details" });
    }
};

// Delete a Contest (Admin only)
exports.deleteContest = async (req, res) => {
    try {
        const contest = await Contest.findById(req.params.id);

        if (!contest) {
            return res.status(404).json({ success: false, message: "Contest not found" });
        }

        await contest.deleteOne();

        res.status(200).json({ success: true, message: "Contest deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting contest" });
    }
};

// Student: Toggle Interested Contest
exports.toggleInterestedContest = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { contestId } = req.body;

        if (!contestId) {
            return res.status(400).json({ success: false, message: "Contest ID is required" });
        }

        const isInterested = user.interestedContests.includes(contestId);

        if (isInterested) {
            user.interestedContests = user.interestedContests.filter(id => id.toString() !== contestId);
        } else {
            user.interestedContests.push(contestId);
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: isInterested ? "Contest removed from interested list" : "Contest added to interested list",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating interested contests" });
    }
};
