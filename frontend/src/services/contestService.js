import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/contests";

// Fetch all contests
export const fetchContests = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getall`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contests:", error);
    return { success: false, error: error.response?.data?.message || "Error fetching contests" };
  }
};

// Toggle interested contest
export const toggleInterestedContest = async (contestId) => {
    const token = localStorage.getItem("token"); // Fetch token directly
    console.log("🔑 Token before sending request:", token); // Debugging log
  
    if (!token) {
      console.error("❌ No token found. User might not be logged in.");
      return { success: false, error: "You need to be logged in to like contests" };
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/contests/interested",
        { contestId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("✅ Contest Liked:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error toggling interested contest:", error.response?.data || error);
      return { success: false, error: error.response?.data?.message || "Error toggling contest" };
    }
  };
  