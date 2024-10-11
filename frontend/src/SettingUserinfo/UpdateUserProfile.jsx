import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChangePasswordForm from './ChangePasswordForm';

const UpdateUserProfile = () => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    UserName: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [file, setFile] = useState(null);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.userId;

        const res = await axios.get(`http://localhost:5000/api/auth/getUserById/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData(res.data.user);
      } catch (error) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    const form = new FormData();
    form.append('FirstName', formData.FirstName);
    form.append('LastName', formData.LastName);
    form.append('UserName', formData.UserName);
    form.append('email', formData.email);
    if (file) {
      form.append('profilepic', file);
    }

    try {
      await axios.put(`http://localhost:5000/api/auth/updatebyid`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Profile updated successfully!');
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        {showChangePasswordForm ? (
          <ChangePasswordForm onSuccess={() => setShowChangePasswordForm(false)} />
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 font-semibold" htmlFor="FirstName">First Name</label>
                <input
                  type="text"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="First Name"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-semibold" htmlFor="LastName">Last Name</label>
                <input
                  type="text"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Last Name"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-semibold" htmlFor="UserName">User Name</label>
                <input
                  type="text"
                  name="UserName"
                  value={formData.UserName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Username"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-semibold" htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Email"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-semibold" htmlFor="profilepic">Profile Picture</label>
                <input
                  type="file"
                  name="profilepic"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Update Profile
                </button>
                <button
                  type="button"
                  onClick={() => setShowChangePasswordForm(!showChangePasswordForm)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {showChangePasswordForm ? 'Cancel' : 'Change Password'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateUserProfile;
