import React, { useState } from 'react'; // Import useState
import signinImage from '../assets/ach3 1.png'; // Image path
import { Link ,useNavigate} from 'react-router-dom'; 
import axios from 'axios'; // Import axios

const SignIn = () => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
// Extract user role if needed
      // Handle redirection or state update based on user role if needed
      navigate('/Dashboard');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.'); // Set error message
      console.error(error.response.data); // Log error for debugging
    }
  };

  return (
    <div className="min-h-screen bg-red-100 flex flex-col md:flex-row items-center justify-center">
      
      {/* Image Section */}
      <div className="hidden md:block w-1/2">
        <img src={signinImage} alt="Sign In Illustration" className="max-w-full h-auto" />
      </div>

      {/* Form Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4 flex items-center border border-gray-300 rounded p-2">
            <span className="material-icons text-gray-500 mr-2">email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              className="w-full outline-none" 
              placeholder="Enter Email" 
              required
            />
          </div>
          {/* Password Input */}
          <div className="mb-4 flex items-center border border-gray-300 rounded p-2">
            <span className="material-icons text-gray-500 mr-2">lock</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              className="w-full outline-none" 
              placeholder="Enter Password" 
              required
            />
          </div>
          <div className="flex items-center mb-6">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm">Remember Me</label>
          </div>
          {errorMessage && <p className="mb-4 text-red-500 text-center">{errorMessage}</p>} {/* Show error message */}
          <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600">Login</button>
        </form>

        {/* Sign Up Link */}
        <p className="text-sm text-center mt-4">Don’t have an account? <Link to="/register" className="text-blue-500">Create One</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
