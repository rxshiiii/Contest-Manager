import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand & Description */}
        <div>
          <h2 className="text-xl font-bold text-white">Contest Management System</h2>
          <p className="mt-3 text-sm">
            A platform to discover, participate in, and manage coding contests. Elevate your competitive programming skills and stay ahead in the game.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white">Quick Links</h2>
          <ul className="mt-3 space-y-2">
            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
            <li><Link to="/login" className="hover:text-blue-400 transition">Login</Link></li>
            <li><Link to="/signup" className="hover:text-blue-400 transition">Sign Up</Link></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold text-white">Contact Us</h2>
          <p className="mt-3 text-sm"> Pune, Maharashtra, India</p>
          <p className="text-sm"> Email: rgankaikar@gmail.com</p>
          <p className="text-sm"> Phone: 8767926165</p>

          {/* Social Media */}
          <div className="flex mt-4 space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} Contest Management System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
