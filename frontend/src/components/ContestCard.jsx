import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ContestCard = ({ contest }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
      whileHover={{ scale: 1.05 }}
    >
      {/* Contest Thumbnail */}
      <img
        src={contest.contestThumbnail || "https://via.placeholder.com/600"}
        alt={contest.contestName}
        className="w-full h-40 object-cover"
      />

      {/* Contest Content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{contest.contestName}</h2>
        <p className="text-gray-600 text-sm mt-2">
          {contest.contestDescription.length > 60
            ? contest.contestDescription.substring(0, 60) + "..."
            : contest.contestDescription}
        </p>

        {/* View Details Button */}
        <Link to={`/contest/${contest._id}`}>
          <motion.button
            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            whileHover={{ scale: 1.05 }}
          >
            View Details →
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ContestCard;
