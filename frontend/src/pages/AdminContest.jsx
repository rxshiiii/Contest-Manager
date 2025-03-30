import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContestAdmin() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [contestData, setContestData] = useState({
    contestName: "",
    contestDescription: "",
    contestThumbnail: "",
    platform: "",
    contestLink: "",
    startDate: "",
    endDate: "",
  });
  const [contestId, setContestId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000/api";

  const validateForm = () => {
    const { contestName, contestDescription, contestThumbnail, contestLink, startDate, endDate } = contestData;
    if (!contestName || !contestDescription || !contestThumbnail || !contestLink || !startDate || !endDate) {
      setError("All fields are required.");
      return false;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      setError("End date must be after start date.");
      return false;
    }
    setError("");
    return true;
  };

  const handleInputChange = (e) => {
    setContestData({ ...contestData, [e.target.name]: e.target.value });
  };

  const createContest = async () => {
    if (!validateForm()) return;
    if (!token) {
      setError("Authentication error: Token missing. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/contests/create`, contestData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      toast.success("Contest created successfully!", { autoClose: 2000 });

      setContestData({
        contestName: "",
        contestDescription: "",
        contestThumbnail: "",
        platform: "",
        contestLink: "",
        startDate: "",
        endDate: "",
      });

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("Error creating contest:", error);
      toast.error(error.response?.data?.message || "Failed to create contest.");
    }
    setLoading(false);
  };

  const deleteContest = async () => {
    if (!contestId) {
      setError("Please enter a contest ID.");
      return;
    }
    if (!token) {
      setError("Authentication error: Token missing. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`${API_URL}/contests/delete/${contestId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      toast.success("Contest deleted successfully!", { autoClose: 2000 });

      setContestId("");

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("Error deleting contest:", error);
      toast.error(error.response?.data?.message || "Failed to delete contest.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto mt-24 mb-10 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Admin Panel</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Contest Creation */}
      <div className="space-y-4">
        {[
          { label: "Contest Name", name: "contestName", type: "text", placeholder: "Enter contest name" },
          { label: "Thumbnail URL", name: "contestThumbnail", type: "text", placeholder: "Image URL" },
          { label: "Platform", name: "platform", type: "text", placeholder: "Platform name" },
          { label: "Contest Link", name: "contestLink", type: "text", placeholder: "https://example.com" },
        ].map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label className="block text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={contestData[name]}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>
        ))}

        <label className="block text-gray-700">Contest Description</label>
        <textarea
          name="contestDescription"
          placeholder="Enter contest description"
          value={contestData.contestDescription}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Start Date</label>
            <input
              type="datetime-local"
              name="startDate"
              value={contestData.startDate}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700">End Date</label>
            <input
              type="datetime-local"
              name="endDate"
              value={contestData.endDate}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        <button
          onClick={createContest}
          disabled={loading}
          className={`p-3 rounded w-full text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Creating..." : "Create Contest"}
        </button>
      </div>

      <hr />

      {/* Contest Deletion */}
      <div className="space-y-4">
        <label className="block text-gray-700">Contest ID</label>
        <input
          type="text"
          placeholder="Enter contest ID to delete"
          value={contestId}
          onChange={(e) => setContestId(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={deleteContest}
          disabled={loading}
          className={`p-3 rounded w-full text-white ${loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}`}
        >
          {loading ? "Deleting..." : "Delete Contest"}
        </button>
      </div>
    </div>
  );
}
