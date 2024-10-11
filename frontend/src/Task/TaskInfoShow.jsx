import React, { useState,useEffect } from 'react';

const TaskInfoShow = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  if (!task) return <div>Select a task to see the details</div>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editedTask.title || !editedTask.description) {
      alert('Title and description are required.');
      return;
    }
    onUpdate(editedTask);
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await onDelete(task._id);
    }
  };

  return (
    <div className="min-h-screen flex justify-center ">
      <div className="bg-white p-6 w-auto rounded-lg shadow-lg text-left">
        {isEditing ? (
           <div className='w-96 h-auto '>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 font-semibold">Task Title:</label>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border rounded"
              required
            />

            <label className="block mb-2 font-semibold">Objective:</label>
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleInputChange}
              className="w-full h-32 p-2 mb-4 border rounded"
              required
            />

            <label className="block mb-2 font-semibold">Priority:</label>
            <select
              name="priority"
              value={editedTask.priority}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border rounded"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Extreme">Extreme</option>
            </select>

            <label className="block mb-2 font-semibold">Status:</label>
            <select
              name="status"
              value={editedTask.status}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border rounded"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <label className="block mb-2 font-semibold">Deadline for Submission:</label>
            <input
              type="date"
              name="dueDate"
              value={new Date(editedTask.dueDate).toISOString().split('T')[0]}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border rounded"
              required
            />

            <div className="flex justify-end">
              <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2">
                Save
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
          </div>
        ) : (
          <>
          <div className='w-96 h-auto '>
            <div className='flex justify-between'>
          <div >
            {task.taskimage ? (
            <img
      className="w-32 h-32 rounded-lg object-cover"
      src={`http://localhost:5000${task.taskimage}`}
      alt="Task"
    />
  ) : (
    <div className="w-32 h-32 rounded-lg bg-gray-200" />
  )}
</div>
  <div className="text-left m-4  flex-1">
    <p className={`font-semibold mb-1 ${task.priority === 'Extreme' ? 'text-red-500' : 'text-yellow-500'}`}>
      <span className="text-black font-light">Priority: </span> {task.priority}
    </p>
    <p className={`font-semibold mb-1 ${task.status === 'Not Started' ? 'text-red-500' : 'text-green-500'}`}>
      <span className="text-black font-light">Status: </span> {task.status}
    </p>
    <p className="text-sm text-gray-400">
      Created on: {new Date(task.createdAt).toLocaleDateString()}
    </p>
  
</div>
</div>
<h2 className="text-xl font-bold m-2">
  Task Title: <span className="font-normal">{task.title}</span>
</h2>

<p className="font-semibold mb-2">
  Objective: <span className="font-normal text-gray-600 block truncate w-full overflow-hidden whitespace-nowrap text-ellipsis">{task.description || 'No description available.'}</span>
</p>

<p className="font-semibold mb-2">Task Description:</p>
<p className="text-gray-600 mb-4">
  {task.description || 'No description available.'}
</p>

<p className="font-semibold mb-2">
  Deadline for Submission:{' '}
  <span className="font-normal">
    {new Date(task.dueDate).toLocaleDateString()}
  </span>
</p>

<div className="mt-4 flex justify-end space-x-2">
  <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600" onClick={handleDeleteClick}>
    Delete
  </button>
  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600" onClick={() => setIsEditing(true)}>
    Edit
  </button>
</div>
</div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskInfoShow;
