import React, { useState, useEffect } from 'react';
import Navbar from './Header/Navbar';
import TaskDashboard from '../Task/TaskDashboard';
import TaskCategories from '../Category/TaskCategories'
import AddCategories from '../Category/addCategory'
import AddPriority from '../Category/Addpriority'
import Settings from '../SettingUserinfo/AccountInformation'
import UpadateUserProfile from '../SettingUserinfo/UpdateUserProfile'
import MyTask from '../Task/MyTask'
import TaskInfoShow from '../Task/TaskInfoShow'
import VitalTask from '../Task/VitalTask'
import axios from 'axios';
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
} from '@heroicons/react/24/outline'; 
import { Routes, Route, useNavigate, Link } from "react-router-dom"; 

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileData, setProfileData] = useState({ email: '', UserName: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setProfileData(null);
    Navigate("/login");
  };

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
          headers: { Authorization: `Bearer ${token}` }
        });

        setProfileData(res.data.user);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden p-4 focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <XMarkIcon className="w-8 h-8 text-black" /> : <Bars3Icon className="w-8 h-8 text-black" />}
        </button>

        {/* Sidebar */}
        <div className={`min-h-full bg-red-500 text-white flex flex-col items-center p-5 transition-all duration-300 fixed md:relative z-40 ${isOpen ? "w-64" : "w-0"} md:w-64`}>
          {/* Profile Section */}
          <div className="flex flex-col items-center space-y-4 mb-8">
            {/* Profile Picture */}
            {profileData.profilepic && (
          <div className="w-16 h-16">
            <img
              className="w-full h-full rounded-full object-cover"
              src={profileData.profilepic ? `http://localhost:5000${profileData.profilepic}` : '/Group 76 (2).png'}
              alt="Task"
            />
          </div>
        )}
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-300">{error}</p>
            ) : (
              <div className="text-center">
                <h2 className="text-lg font-semibold">{profileData.UserName}</h2>
                <p className="text-sm">{profileData.email}</p>
              </div>
            )}
          </div>

          {/* Sidebar Links */}
          <nav className="flex-1 space-y-6">
            <Link to="/dashboard/taskhome" className="flex items-center space-x-3 hover:bg-red-400 p-2 rounded">
              <Squares2X2Icon className="w-6 h-6" />
              <span className="text-lg font-medium">Dashboard</span>
            </Link>
            <Link to="/dashboard/vitaltask" className="flex items-center space-x-3 hover:bg-red-400 p-2 rounded">
              <ExclamationCircleIcon className="w-6 h-6" />
              <span className="text-lg font-medium">Vital Task</span>
            </Link>
            <Link to="/dashboard/mytask" className="flex items-center space-x-3 hover:bg-red-400 p-2 rounded">
              <CheckCircleIcon className="w-6 h-6" />
              <span className="text-lg font-medium">My Task</span>
            </Link>
            <Link to="/dashboard/taskcategories" className="flex items-center space-x-3 hover:bg-red-400 p-2 rounded">
              <FolderIcon className="w-6 h-6" />
              <span className="text-lg font-medium">Task Categories</span>
            </Link>
            <Link to="/dashboard/settings" className="flex items-center space-x-3 hover:bg-red-400 p-2 rounded">
              <CogIcon className="w-6 h-6" />
              <span className="text-lg font-medium">Settings</span>
            </Link>
            <Link to="/dashboard/help" className="flex items-center space-x-3 hover:bg-red-400 p-2 rounded">
              <QuestionMarkCircleIcon className="w-6 h-6" />
              <span className="text-lg font-medium">Help</span>
            </Link>
          </nav>

          {/* Logout */}
          <button
            className="flex items-center space-x-3 hover:bg-red-400 p-2 rounded mt-auto"
            onClick={logout}
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            <span>Logout</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-0 p-6">
          <Routes>
          <Route path="/" element={<TaskDashboard />} />
            <Route path="taskhome" element={<TaskDashboard />} />
            <Route path="taskcategories" element={<TaskCategories/>} />
            <Route path="/add-category" element={<AddCategories />} />
            <Route path="/add-priority" element={<AddPriority />} />
            <Route path="settings" element={<Settings/>} />
            <Route path="/UpadateUserProfile" element={<UpadateUserProfile/>} />
            <Route path="mytask" element={<MyTask/>} />
            <Route path="/task/:taskid" element={<TaskInfoShow />} />
            <Route path="vitaltask" element={<VitalTask/>} />
            {/* 
          <Route path="help" element={<h1>Help</h1>} />
          <Route path="details/:taskid" element={<TaskDetails/>} />  */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
