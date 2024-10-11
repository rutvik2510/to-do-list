import React, { useState } from 'react';
import signupImage from '../assets/R 2.png';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    UserName: '',
    email: '',
    password: '',
    ConfirmPassword: '',
    profilepic: null, // Updated for file input
    agreeTerms: false,
  });
  
  const [message, setMessage] = useState('');
  const { FirstName, LastName, UserName, email, password, ConfirmPassword, profilepic, agreeTerms } = formData;

  // Update handleChange to manage file input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ 
      ...formData, 
      [name]: files ? files[0] : value // Handle file upload for 'profilepic'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== ConfirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    // Using FormData to handle image uploads
    const formDataToSend = new FormData();
    formDataToSend.append('FirstName', FirstName);
    formDataToSend.append('LastName', LastName);
    formDataToSend.append('UserName', UserName);
    formDataToSend.append('email', email);
    formDataToSend.append('password', password);
    formDataToSend.append('profilepic', profilepic); // Append the image file

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: formDataToSend, // Use FormData instead of JSON
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('User registered successfully!');
        setFormData({
          FirstName: '',
          LastName: '',
          UserName: '',
          email: '',
          password: '',
          ConfirmPassword: '',
          profilepic: null,
          agreeTerms: false,
        });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-red-100 flex flex-col md:flex-row items-center justify-center">
      {/* Image Section */}
      <div className="hidden md:block w-1/2">
        <img src={signupImage} alt="Sign Up Illustration" className="max-w-full h-auto" />
      </div>

      {/* Form Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        
        <form onSubmit={handleSubmit}>
          {/* FirstName */}
          <div className="mb-4 flex items-center border border-gray-300 rounded p-2">
            <span className="material-icons text-gray-500 mr-2">person</span>
            <input
              type="text"
              name='FirstName'
              value={FirstName}
              onChange={handleChange}
              className="w-full outline-none"
              placeholder="Enter First Name"
              required
            />
          </div>

          {/* LastName */}
          <div className="mb-4 flex items-center border border-gray-300 rounded p-2">
            <span className="material-icons text-gray-500 mr-2">person_outline</span>
            <input
              type="text"
              name='LastName'
              value={LastName}
              onChange={handleChange}
              className="w-full outline-none"
              placeholder="Enter Last Name"
              required
            />
          </div>

          {/* UserName */}
          <div className="mb-4 flex items-center border border-gray-300 rounded p-2">
            <span className="material-icons text-gray-500 mr-2">account_circle</span>
            <input
              type="text"
              name='UserName'
              value={UserName}
              onChange={handleChange}
              className="w-full outline-none"
              placeholder="Enter Username"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4 flex items-center border border-gray-300 rounded p-2">
            <span className="material-icons text-gray-500 mr-2">email</span>
            <input 
              type="email"
              name='email'
              value={email}
              onChange={handleChange}
              className="w-full outline-none"
              placeholder="Enter Email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4 flex items-center border border-gray-300 rounded p-2">
            <span className="material-icons text-gray-500 mr-2">lock</span>
            <input
              type="password"
              name='password'
              value={password}
              onChange={handleChange}
              className="w-full outline-none"
              placeholder="Enter Password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4 flex items-center border border-gray-300 rounded p-2">
            <span className="material-icons text-gray-500 mr-2">lock_outline</span>
            <input 
              type="password"
              name='ConfirmPassword'
              value={ConfirmPassword}
              onChange={handleChange}
              className="w-full outline-none"
              placeholder="Confirm Password"
              required
            />
          </div>

          {/* Profile Picture Upload */}
          {/* <div className="mb-4 flex items-center border border-gray-300 rounded p-2">
            <span className="material-icons text-gray-500 mr-2">image</span>
            <input 
              type="file"
              name="profilepic"
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div> */}

          {/* Agree to Terms */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreeTerms"
              name="agreeTerms"
              checked={agreeTerms}
              onChange={handleChange}
              required
            />
            <label htmlFor="terms" className="text-sm">I agree to all terms</label>
          </div>

          {message && <p className="mb-4 text-red-500">{message}</p>}

          {/* Register Button */}
          <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600">Register</button>
        </form>

        {/* Sign In Link */}
        <p className="text-sm text-center mt-4">Already have an account? <Link to="/login" className="text-blue-500">Sign In</Link></p>
      </div>
    </div>
  );
};

export default Register;
