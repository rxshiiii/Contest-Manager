import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import AuthContext

const API_BASE_URL = 'http://localhost:5000/api/profile';

const useProfileService = () => {
  const { token } = useAuth(); // Get token from AuthContext

  const getProfile = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }, // Attach token
      });
      return response.data.user;
    } catch (error) {
      throw error.response?.data || 'Error fetching profile';
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update`, profileData, {
        headers: { Authorization: `Bearer ${token}` }, // Attach token
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Error updating profile';
    }
  };

  return { getProfile, updateProfile };
};

export default useProfileService;
