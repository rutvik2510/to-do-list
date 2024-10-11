import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordForm = ({ onSuccess }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token'); // Fetch the token
        if (!token) {
            setError('No authentication token found. Please log in.');
            return;
        }

        // Check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            setError('New password and confirmation do not match.');
            return;
        }

        try {
            const res = await axios.put(
                'http://localhost:5000/api/auth/updatebyid',
                {
                    currentPassword: oldPassword, // Use the correct variable name here
                    newPassword: newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in request headers
                    },
                }
            );

            setMessage('Password changed successfully!');
            // Optionally reset the form
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.msg || 'Failed to change password.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1">Old Password</label>
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="border rounded p-2 w-full"
                    required
                />
            </div>
            <div>
                <label className="block mb-1">New Password</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border rounded p-2 w-full"
                    required
                />
            </div>
            <div>
                <label className="block mb-1">Confirm New Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border rounded p-2 w-full"
                    required
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Change Password</button>
        </form>
    );
};

export default ChangePasswordForm;
