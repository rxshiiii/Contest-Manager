import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, token } = useAuth();
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) fetchProfile();
    }, [user]);

    const fetchProfile = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/profile/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile(response.data.user);
            setUpdatedProfile(response.data.user.profile);
            setLoading(false);
        } catch (err) {
            setError('Failed to load profile');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setUpdatedProfile({
            ...updatedProfile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Sending update request:', updatedProfile);
            const response = await axios.put(
                'http://localhost:5000/api/profile/update',
                { profile: updatedProfile },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Profile updated successfully:', response.data);
            setProfile({ ...profile, profile: updatedProfile });
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating profile:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to update profile');
        }
    };

    if (!user) return <p className="text-center text-gray-500">Please log in to view your profile.</p>;
    if (loading) return <div className="flex justify-center items-center min-h-screen"><Loader className="animate-spin w-8 h-8 text-gray-600" /></div>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <motion.div 
            className="max-w-4xl mx-auto p-6 mt-24"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h2 className="text-3xl font-bold text-center mb-6">Profile</h2>

            <div className="bg-white p-6 shadow-lg rounded-xl">
                <div className="flex flex-col items-center">
                    <motion.img 
                        src={profile.profile.profilePhoto || 'https://via.placeholder.com/150'} 
                        alt="Profile" 
                        className="w-24 h-24 rounded-full border" 
                        whileHover={{ scale: 1.1 }}
                    />
                    <h3 className="text-xl font-semibold mt-3">{profile.firstName} {profile.lastName}</h3>
                    <p className="text-gray-500">{profile.email}</p>
                </div>

                {!isEditing ? (
                    <motion.div 
                        className="mt-6 space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p><strong>Gender:</strong> {profile.profile.gender}</p>
                        <p><strong>Contact:</strong> {profile.profile.contactNumber}</p>
                        <p><strong>About:</strong> {profile.profile.about}</p>
                        <button 
                            className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 transition hover:bg-blue-700"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>
                    </motion.div>
                ) : (
                    <motion.form 
                        className="mt-6 space-y-4"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <input 
                            type="text" 
                            name="gender" 
                            value={updatedProfile.gender} 
                            onChange={handleChange} 
                            placeholder="Gender" 
                            className="w-full px-4 py-2 border rounded-md"
                        />
                        <input 
                            type="text" 
                            name="contactNumber" 
                            value={updatedProfile.contactNumber} 
                            onChange={handleChange} 
                            placeholder="Contact Number" 
                            className="w-full px-4 py-2 border rounded-md"
                        />
                        <textarea 
                            name="about" 
                            value={updatedProfile.about} 
                            onChange={handleChange} 
                            placeholder="About You" 
                            className="w-full px-4 py-2 border rounded-md"
                        />
                        <div className="flex gap-4">
                            <button 
                                type="submit" 
                                className="bg-green-600 text-white px-4 py-2 rounded-md transition hover:bg-green-700"
                            >
                                Save
                            </button>
                            <button 
                                type="button" 
                                className="border border-gray-400 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.form>
                )}
            </div>

            <h3 className="text-2xl font-bold mt-8">Interested Contests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {profile.interestedContests.length === 0 ? (
                    <p className="text-gray-500 text-center">No contests added yet.</p>
                ) : (
                    profile.interestedContests.map(contest => (
                        <motion.div 
                            key={contest._id} 
                            className="bg-white p-4 shadow-md rounded-lg"
                            whileHover={{ scale: 1.03 }}
                        >
                            <img 
                                src={contest.contestThumbnail} 
                                alt={contest.contestName} 
                                className="w-full h-32 object-cover rounded-md"
                            />
                            <div className="mt-2">
                                <h4 className="text-lg font-semibold">{contest.contestName}</h4>
                                <p className="text-gray-500">{contest.platform}</p>
                                <a 
                                    href={contest.contestLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-500 underline hover:text-blue-700 transition"
                                >
                                    View Contest
                                </a>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default Profile;
