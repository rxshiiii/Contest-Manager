import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { toggleInterestedContest } from "../services/contestService";
import { toast } from "react-toastify";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Like icons

const ContestDetails = () => {
  const { id } = useParams();
  const { user, loginUser } = useContext(AuthContext);
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/contests/${id}`);
        setContest(response.data.contest);

        // ✅ Check if the user has already liked this contest
        if (user?.interestedContests?.includes(id)) {
          setLiked(true);
        }
      } catch (error) {
        console.error("Error fetching contest details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContestDetails();
  }, [id, user]);

  const handleLike = async () => {
    if (!user?.token) {
      toast.error("You need to be logged in to like contests!");
      return;
    }

    try {
      const updatedUser = await toggleInterestedContest(id);

      // ✅ Ensure token is retained while updating interested contests
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        loginUser({ ...storedUser, interestedContests: updatedUser.interestedContests });
      }

      setLiked(!liked);

      if (!liked) {
        toast.success("❤️ Liked the contest!", { position: "top-right" });
      } else {
        toast.error("💔 Removed from Interested Contests", { position: "top-right" });
      }
    } catch (error) {
      console.error("Failed to like/unlike contest:", error);
      toast.error("⚠️ Error updating like status.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-10 border border-gray-200"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Contest Thumbnail with Fade-in Animation */}
      <motion.img
        src={contest.contestThumbnail || "https://via.placeholder.com/600"}
        alt={contest.contestName}
        className="w-full h-64 object-cover rounded-md shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Contest Name */}
      <motion.h1
        className="text-4xl font-bold mt-6 text-gray-800"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {contest.contestName}
      </motion.h1>

      {/* Platform Badge */}
      <motion.span
        className="mt-2 inline-block bg-blue-500 text-white px-3 py-1 text-sm rounded-md"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {contest.platform}
      </motion.span>

      {/* Contest Description */}
      <motion.p
        className="text-gray-600 mt-4 text-lg leading-relaxed"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {contest.contestDescription}
      </motion.p>

      {/* Additional Details */}
      <motion.div
        className="mt-6 p-4 bg-gray-100 rounded-lg shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-lg">
          <strong>📅 Start Date:</strong> {new Date(contest.startDate).toLocaleString()}
        </p>
        <p className="text-lg mt-2">
          <strong>⏳ End Date:</strong> {new Date(contest.endDate).toLocaleString()}
        </p>
      </motion.div>

      {/* Like Button */}
      <button
        className={`mt-4 flex items-center gap-2 px-4 py-2 text-white text-sm font-semibold rounded-md transition ${
          liked ? "bg-red-500" : "bg-gray-300 text-gray-700"
        }`}
        onClick={handleLike}
      >
        {liked ? <AiFillHeart className="text-white text-lg" /> : <AiOutlineHeart className="text-gray-700 text-lg" />}
        {liked ? "Liked" : "Like"}
      </button>

      {/* Animated Contest Link Button */}
      <motion.a
        href={contest.contestLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-6 text-center text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-3 rounded-md text-lg font-semibold shadow-lg transition duration-300"
        whileHover={{ scale: 1.05 }}
      >
        🔗 Participate Now
      </motion.a>
    </motion.div>
  );
};

export default ContestDetails;
