import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { 
  Squares2X2Icon, 
  ExclamationCircleIcon, 
  CheckCircleIcon, 
  FolderIcon, 
  CogIcon, 
  QuestionMarkCircleIcon, 
  ArrowRightOnRectangleIcon, 
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'; // Import icons from Heroicons
//import {Link,useNavigate} from 'react-router-dom';
import {  Routes, Route, useNavigate,Link } from "react-router-dom"; 



const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar
  const [profileData, setProfileData] = useState({
    email: '',
    UserName: '',
  });
  const Navigate =useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const logout = () => {
    Navigate("/login");
    localStorage.removeItem("token");
    setUser(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false); // Stop loading if no token
        return;
      }

      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.userId; // Extract user ID from the token

        const res = await axios.get(`http://localhost:5000/api/auth/getUserById/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProfileData(res.data.user); // Update profile data
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to fetch profile data."); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex ">
      {/* Mobile Hamburger Button */}
      <button 
        className="md:hidden p-4 focus:outline-none" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <XMarkIcon className="w-8 h-8 text-white" /> : <Bars3Icon className="w-8 h-8 text-white" />}
      </button>

      {/* Sidebar */}
      <div className={`h-auto bg-red-400 text-white flex flex-col items-center p-5 transition-all duration-300 z-50 ${isOpen ? "w-60" : "w-0"} md:w-64 fixed md:relative top-0 left-0`}>
        {/* Profile Section */}
        <div className="flex flex-col items-center space-x-4">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src="https://via.placeholder.com/100" // Placeholder profile image
            alt="Profile"
          />
          {loading ? (
            <p>Loading...</p> // Loading state
          ) : error ? (
            <p className="text-red-500">{error}</p> // Error message
          ) : (
            <div className='flex flex-col items-center'>
              <h2 className="text-xl font-semibold">{profileData.UserName}</h2>
              <p className="text-sm">{profileData.email}</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex-1">
          <ul className="space-y-4">
          <Link to="/dashboard/taskhome">
          <li className="flex items-center space-x-3 hover:bg-white hover:text-red-400 p-2  rounded transition-all duration-300">
              <Squares2X2Icon className="w-6 h-6" />
              <a href="#" className="text-lg font-medium">Dashboard</a>
            </li>
              </Link>
            {/* Sidebar Navigation Links */}
            <li className="flex items-center space-x-3 hover:bg-white hover:text-red-400 p-2  rounded transition-all duration-300">
              <Squares2X2Icon className="w-6 h-6" />
              <a href="#" className="text-lg font-medium">Dashboard</a>
            </li>
            <li className="flex items-center space-x-3 hover:bg-white hover:text-red-400 p-2 rounded transition-all duration-300">
              <ExclamationCircleIcon className="w-6 h-6" />
              <a href="#" className="text-lg font-medium">Vital Task</a>
            </li>
            <li className="flex items-center space-x-3 hover:bg-white hover:text-red-400 p-2 rounded transition-all duration-300">
              <CheckCircleIcon className="w-6 h-6" />
              <a href="#" className="text-lg font-medium">My Task</a>
            </li>
            <li className="flex items-center space-x-3 hover:bg-white hover:text-red-400 p-2 rounded transition-all duration-300">
              <FolderIcon className="w-6 h-6" />
              <a href="#" className="text-lg font-medium">Task Categories</a>
            </li>
            <li className="flex items-center space-x-3 hover:bg-white hover:text-red-400 p-2 rounded transition-all duration-300">
              <CogIcon className="w-6 h-6" />
              <a href="#" className="text-lg font-medium">Settings</a>
            </li>
            <li className="flex items-center space-x-3 hover:bg-white hover:text-red-400 p-2 rounded transition-all duration-300">
              <QuestionMarkCircleIcon className="w-6 h-6" />
              <a href="#" className="text-lg font-medium">Help</a>
            </li>
          </ul>
        </div>

        <div className="mt-auto">
          <a href="#" className="flex  space-x-3 hover:bg-white hover:text-red-400 p-2 rounded transition-all duration-300">
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            <span>Logout</span>
          </a>
        </div>
      </div>
      <div
     className="hero-section"
     style={{ marginTop:'25px', padding: "25px", width: "100%" }}
   >
     <Routes>
       <Route path="taskhome" element={<TaskDashboard  />}/>
       <Route path="vitaltask" element={<VitalTask/>} />
       <Route path="taskcategories" element={<TaskCategories/>} />
       <Route path="settings" element={<Settings/>} />
       <Route path="mytask" element={<MyTask/>} />
       {/*<Route path="help" element={<h1>Help</h1>} />*/}
       <Route path="details/:taskid" element={<TaskDetails/>} /> 
     </Routes>
   </div>
     
    </div>
    
  );
};

export default Sidebar;
