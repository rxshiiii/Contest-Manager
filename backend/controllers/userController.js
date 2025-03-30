const User = require("../models/User");
const Profile = require("../models/Profile");

// Get User Profile (with full profile details)
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("-password") // Exclude password
            .populate("profile")
            .populate("interestedContests");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching profile" });
    }
};

// Update Profile (User + Profile)
exports.updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, profile } = req.body; // Extract 'profile' from body

        // Update user details
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { firstName, lastName },
            { new: true }
        ).populate("profile");

        // If profile data is provided, update Profile model separately
        if (profile) {
            const updatedProfile = await Profile.findByIdAndUpdate(
                updatedUser.profile._id,  // Ensure profile ID is used
                profile,  // Update all provided profile fields
                { new: true }
            );

            updatedUser.profile = updatedProfile; // Attach updated profile
        }

        res.status(200).json({ success: true, user: updatedUser, message: "Profile updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating profile" });
    }
};