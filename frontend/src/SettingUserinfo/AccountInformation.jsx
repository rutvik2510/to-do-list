import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateUserProfile from './UpdateUserProfile';

const AccountInformation = () => {
  const [profileData, setProfileData] = useState({ email: '', UserName: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.userId;

        const res = await axios.get(`http://localhost:5000/api/auth/getUserById/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfileData(res.data.user);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Failed to fetch profile data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="h-full-screen flex items-center justify-center bg-gray-100">
      <div className="relative w-full bg-white rounded-lg overflow-hidden shadow-lg border border-gray-300 p-6">
        <div className="w-full flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">Account Information</h3>
          <a href="/Dashboard/settings" className="text-blue-500 hover:underline">Go Back</a>
        </div>
        <div className="flex items-center space-x-4">
          {profileData.profilepic && (
            <div className="w-16 h-16">
              <img
                className="w-full h-full rounded-full object-cover"
                src={profileData.profilepic ? `http://localhost:5000${profileData.profilepic}` : '/Group 76 (2).png'}
                alt="Profile"
              />
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold">{profileData.UserName}</h2>
            <p className="text-sm text-gray-600">{profileData.email}</p>
          </div>
        </div>
        <div>
          <UpdateUserProfile />
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
