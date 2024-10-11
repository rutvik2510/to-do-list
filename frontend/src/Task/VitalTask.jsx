import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';
import TaskInfoShow from './TaskInfoShow';

const VitalTask = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/tasks/getTasksForUser', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Filter tasks based on priority

const filteredTasks=res.data.tasks.filter(task=>task.priority==='High'||task.priority==='Extreme');

        setTasks(filteredTasks);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleTaskUpdate = async (updatedTask) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/updatetask/${updatedTask._id}`, updatedTask, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        const updatedData = response.data;
        setTasks(tasks.map((task) => (task._id === updatedData._id ? updatedData : task)));
        setSelectedTask(updatedData);
        alert('Task updated successfully!');
      }
    } catch (error) {
      console.error('Failed to update task:', error);
      alert('Failed to update task. Please check your authorization.');
    }
  };

  const handleTaskDelete = async (taskId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(`http://localhost:5000/api/tasks/deletetask/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setTasks(tasks.filter((task) => task._id !== taskId));
        setSelectedTask(null);
        alert('Task deleted successfully!');
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Failed to delete task. Please check your authorization.');
    }
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='flex w-full flex-col md:flex-row md:space-x-4 p-4'>
      <div className="task-list w-1/2  rounded-lg p-4 shadow-md">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} onClick={() => handleTaskClick(task)} className="mb-4">
              <TaskCard
                title={task.title}
                description={task.description}
                priority={task.priority}
                status={task.status}
                dueDate={task.dueDate}
                imageUrl={task.taskimage}
              />
            </div>
          ))
        ) : (
          <p>No Task available.</p>
        )}
      </div>

      <div className=" w-1/2 bg-gray rounded-lg p-4 shadow-md  md:mt-0">
        {selectedTask ? (
          <TaskInfoShow task={selectedTask} onUpdate={handleTaskUpdate} onDelete={handleTaskDelete} />
        ) : (
          <p>Select a task to see the details</p>
        )}
      </div>
    </div>
  );
};

export default VitalTask;
