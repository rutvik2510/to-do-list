import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard'; // Assuming TaskCard is in the same directory

const TaskList = ({ tasks }) => { // Accept tasks as a prop
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
        console.log(res.data.tasks);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="task-list ">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            status={task.status}
            dueDate={task.dueDate}
            imageUrl={task.taskimage}
          />
        ))
      ) : (
        <p className="p-2 text-gray-500">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
