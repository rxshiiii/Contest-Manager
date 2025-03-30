import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authService";
import { motion } from "framer-motion";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword, accountType } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await signup({ firstName, lastName, email, password, confirmPassword, accountType });
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-10">
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>
        <p className="text-gray-500 text-center mt-1">Join our platform today</p>

        {error && (
          <motion.div 
            className="bg-red-100 text-red-700 p-3 rounded-lg mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold">First Name</label>
              <input 
                type="text" 
                name="firstName" 
                placeholder="John" 
                value={formData.firstName} 
                onChange={handleChange} 
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Last Name</label>
              <input 
                type="text" 
                name="lastName" 
                placeholder="Doe" 
                value={formData.lastName} 
                onChange={handleChange} 
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                required 
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="example@example.com" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              required 
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-semibold">Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="********" 
              value={formData.password} 
              onChange={handleChange} 
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              required 
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-semibold">Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="********" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              required 
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-semibold">Account Type</label>
            <select 
              name="accountType" 
              value={formData.accountType} 
              onChange={handleChange} 
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Account Type</option>
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold text-lg transition mt-6"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account? 
            <a href="/login" className="text-blue-500 hover:underline ml-1">Login</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
