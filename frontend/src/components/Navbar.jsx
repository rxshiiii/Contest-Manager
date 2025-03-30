import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = location.pathname === "/";

  // Scroll effect to change Navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-20 py-5 transition-all duration-500 ${
        isHomePage && !isScrolled
          ? "bg-transparent"
          : "bg-white shadow-md"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 group">
        <motion.div 
          className="w-10 h-10 bg-blue-400 rounded-full"
          whileHover={{ scale: 1.1, rotate: 180, backgroundColor: "#60a5fa" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        />
        <span className={`text-2xl font-bold transition-colors ${
          isHomePage && !isScrolled ? "text-white" : "text-gray-900"
        } group-hover:text-blue-400`}>
          Contest Platform
        </span>
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-8">
        <Link
          to="/"
          className={`text-lg tracking-wide transition-all ${
            isHomePage && !isScrolled ? "text-white hover:text-blue-300" : "text-gray-800 hover:text-blue-500"
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`text-lg tracking-wide transition-all ${
            isHomePage && !isScrolled ? "text-white hover:text-blue-300" : "text-gray-800 hover:text-blue-500"
          }`}
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className={`text-lg tracking-wide transition-all ${
            isHomePage && !isScrolled ? "text-white hover:text-blue-300" : "text-gray-800 hover:text-blue-500"
          }`}
        >
          Contact
        </Link>

        {/* Admin Panel (Only for Admins) / Profile (Only for Students) */}
        {user && (
          user.accountType === "Admin" ? (
            <Link 
              to="/admin" 
              className={`text-lg tracking-wide transition-all ${
                isHomePage && !isScrolled ? "text-white hover:text-blue-300" : "text-gray-800 hover:text-blue-500"
              }`}
            >
              Admin Panel
            </Link>
          ) : (
            <Link 
              to="/profile" 
              className={`text-lg tracking-wide transition-all ${
                isHomePage && !isScrolled ? "text-white hover:text-blue-300" : "text-gray-800 hover:text-blue-500"
              }`}
            >
              Profile
            </Link>
          )
        )}
      </nav>

      {/* Login/Logout Buttons */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <button
              onClick={logoutUser}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white shadow-md transition"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white shadow-md transition"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
