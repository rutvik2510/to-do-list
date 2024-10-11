import React, { useState, useEffect } from 'react';
import AddTaskForm from '../Task/addTask';
import TaskList from '../Task/TaskList';
import TaskStatus from '../Task/TaskStatus';
import CompletedTasks from '../Task/CompletedTasks';
import axios from 'axios';

const TaskDashboard = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [profileData, setProfileData] = useState({ UserName: '' });
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  
  const [statusSummary, setStatusSummary] = useState({
    completed: 0,
    inProgress: 0,
    notStarted: 0
  });

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
        
        const tasksRes = await axios.get('http://localhost:5000/api/tasks/getTasksForUser', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(tasksRes.data.tasks || []); // Ensure tasks is always an array

        const completed = tasksRes.data.tasks.filter(task => task.status === 'Completed').length;
        const inProgress = tasksRes.data.tasks.filter(task => task.status === 'In Progress').length;
        const notStarted = tasksRes.data.tasks.filter(task => task.status === 'Pending').length;

        const totalTasks = tasksRes.data.tasks.length;
        setStatusSummary({
          completed: Number(totalTasks > 0 ? ((completed / totalTasks) * 100) : 0),
          inProgress: Number(totalTasks > 0 ? ((inProgress / totalTasks) * 100) : 0),
          notStarted: Number(totalTasks > 0 ? ((notStarted / totalTasks) * 100) : 0)
        });
        
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddTaskClick = () => {
    setShowAddTask(true);
  };

  const closeTaskForm = () => {
    setShowAddTask(false);
  };
  

  return (
    <>
      <div className="relative min-h-screen bg-gray-100 p-2">
        <div className={`flex ${showAddTask ? 'blur-sm' : ''}`}>
          <div className="flex-1 mb-2">
            <h2 className="text-3xl font-semibold text-purple-700"><span className='text-black'>Welcome back,</span> {profileData.UserName}</h2>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex shadow-md bg-white mt-1 rounded-md">
          {/* Right Side */}
          <div className="mt-6 p-4 w-full shadow-lg rounded-md">
            <div className="flex items-center justify-between bg-gray-50 p-4 shadow-md rounded-md">
              <div className="flex items-center">
                <i className="fas fa-clock text-gray-600 text-xl"></i>
                <h2 className="ml-3 text-lg font-semibold text-gray-900">To-Do</h2>
              </div>
              <div className="flex items-center text-red-500 cursor-pointer">
                <i className="fas fa-plus text-sm mr-2"></i>
                <button 
                  onClick={handleAddTaskClick} 
                  className="text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-500">
                  Add Task
                </button>
              </div>
            </div>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <div className="overflow-x-auto whitespace-nowrap mt-4">
                <TaskList tasks={tasks} /> {/* Pass tasks to TaskList */}
              </div>
            )}
          </div>
          {/* Left Side */}
          <div className="ml-4 mt-6 w-full">
            <div className="rounded-md p-6">
              <TaskStatus 
                completed={statusSummary.completed} 
                inProgress={statusSummary.inProgress} 
                notStarted={statusSummary.notStarted} 
              />
            </div>
            <div className="rounded-md p-6">
              <CompletedTasks tasks={tasks} />
            </div>
          </div>
        </div>
        {showAddTask && (
          <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <AddTaskForm onClose={closeTaskForm} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskDashboard;
