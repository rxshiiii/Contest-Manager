import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const images = [
  "https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?cs=srgb&dl=pexels-keira-burton-6147369.jpg&fm=jpg",
  "https://images.pexels.com/photos/1326947/pexels-photo-1326947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=1200",
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative min-h-screen flex flex-col justify-center text-left px-20 py-16 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="relative w-full max-w-xl flex flex-col space-y-7 text-white ml-12">
          <motion.h1
            className="text-4xl font-extrabold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Discover and Participate in Coding Contests
          </motion.h1>
          <motion.p
            className="mt-4 text-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Stay updated with live contests from platforms like HackerRank, HackerEarth, and LeetCode. 
            Compete with others and improve your coding skills.
          </motion.p>
          <div className="mt-6 flex space-x-4">
            <Link to="/signup">
              <motion.button
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold transition"
                whileHover={{ scale: 1.1 }}
              >
                Get Started
              </motion.button>
            </Link>
            <Link to="/contests">
              <motion.button
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold transition"
                whileHover={{ scale: 1.1 }}
              >
                View Contests
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-100 text-left px-20">
        <h2 className="text-3xl font-bold text-gray-800">Why Choose This Platform?</h2>
        <p className="text-lg text-gray-600 mt-4">
          A streamlined way to explore, participate in, and manage coding contests.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="p-6 bg-white rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-blue-600">Live Contest Aggregation</h3>
            <p className="text-gray-600 mt-2">
              Get real-time updates on contests from multiple platforms in one place.
            </p>
          </motion.div>

          <motion.div
            className="p-6 bg-white rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-blue-600">Save Contests</h3>
            <p className="text-gray-600 mt-2">
              Mark contests as favorites and access them easily from your profile.
            </p>
          </motion.div>

          <motion.div
            className="p-6 bg-white rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-blue-600">Easy Contest Management</h3>
            <p className="text-gray-600 mt-2">
              Admins can create, edit, and delete contests through a user-friendly interface.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Additional Section */}
      <div className="py-16 bg-white text-left px-20">
        <h2 className="text-3xl font-bold text-gray-800">Start Competing Today</h2>
        <p className="text-lg text-gray-600 mt-4">
          Whether you are a beginner or an advanced programmer, this platform helps you stay updated with the latest coding challenges and competitions.
        </p>
        <div className="mt-6">
          <Link to="/signup">
            <motion.button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold transition"
              whileHover={{ scale: 1.1 }}
            >
              Join Now
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
