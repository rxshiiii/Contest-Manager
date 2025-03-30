import { useEffect, useState } from "react";
import axios from "axios";
import ContestCard from "../components/ContestCard";
import FilterBar from "../components/FilterBar";
import { motion } from "framer-motion";

const StudentDashboard = () => {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contests/getall");
        setContests(response.data.contests);
        setFilteredContests(response.data.contests);
      } catch (error) {
        console.error("Error fetching contests", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  const handleFilterChange = (platform) => {
    setSelectedPlatform(platform);
    if (platform === "All" || platform === "") {
      setFilteredContests(contests);
    } else {
      setFilteredContests(contests.filter((contest) => contest.platform === platform));
    }
  };

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto mt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.h1
        className="text-3xl font-bold text-gray-800 mb-6 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        🚀 Upcoming Coding Contests
      </motion.h1>

      {/* Filter Bar */}
      <FilterBar platforms={[...new Set(contests.map(c => c.platform))]} selectedPlatform={selectedPlatform} onFilterChange={handleFilterChange} />

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <motion.div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {filteredContests.length > 0 ? (
            filteredContests.map((contest) => (
              <ContestCard key={contest._id} contest={contest} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">No contests available for this platform.</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default StudentDashboard;
