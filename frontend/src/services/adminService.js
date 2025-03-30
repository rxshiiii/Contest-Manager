import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:5000/api/contests";

export const createContest = async (contestData, token) => {
  try {
    const response = await axios.post(`${API_URL}/create`, contestData, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token for authentication
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to create contest";
  }
};

export const deleteContest = async (contestId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${contestId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete contest";
  }
};
