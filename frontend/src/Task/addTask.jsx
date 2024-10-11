import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTaskForm = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [taskImage, setTaskImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesAndPriorities = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const headers = { Authorization: `Bearer ${token}` };
        const [categoriesResponse, prioritiesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/category/getallcategory', { headers }),
          axios.get('http://localhost:5000/api/priority/getallpriority', { headers }),
        ]);

        setCategories(categoriesResponse.data.category || []);
        setPriorities(prioritiesResponse.data.priority || []);
      } catch (error) {
        console.error('Error fetching categories or priorities:', error);
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndPriorities();
  }, []);

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setTaskImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authorization token found. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('dueDate', dueDate); 
      formData.append('priority', priority);
      formData.append('description', description);
      formData.append('category', category); 
      formData.append('taskimage', taskImage); 

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios.post('http://localhost:5000/api/tasks/addtask', formData, config);

      if (response.data.success) {
        alert('Task Added Successfully');
        onClose();
        resetForm();
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Error adding task:', err.message);
      setError('Error adding task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDueDate('');
    setPriority('');
    setDescription('');
    setCategory('');
    setTaskImage(null);
  };

  return (
    <div className="fixed inset-0 bg-black h-auto bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Add New Task</h2>
          <button className="text-red-500 hover:text-red-700" onClick={onClose}>
            Go Back
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6 w-auto">
          {/* Title */}
          <div className='flex justify-between'>
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium">Due Date</label>
            <input
              type="date"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          </div>
          {/* Category */}
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.Cname}</option>
                ))
              ) : (
                <option value="">No categories available</option>
              )}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium">Priority</label>
            <div className="flex gap-4 mt-2">
              {priorities.length > 0 ? (
                priorities.map((p) => (
                  <label key={p._id} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="priority"
                      value={p.level}
                      className="form-radio"
                      onChange={() => setPriority(p.level)}
                      required
                    />
                    <span className="ml-2">{p.level}</span>
                  </label>
                ))
              ) : (
                <p>No priorities available</p>
              )}
            </div>
          </div>
<div className='flex flex-col justify-between' >
          {/* Task Description */}
          <div>
            <label className="block text-sm font-medium">Task Description</label>
            <textarea
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Start writing here..."
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="w-full">
              <label className="block text-sm font-medium">Upload Image</label>
              <div className="mt-2 w-full border-2 border-dashed border-gray-300 p-4 rounded-md flex justify-center items-center cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  id="imageUpload"
                  name='taskimage'
                  onChange={handleImageUpload}
                  accept="image/*"
                />
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer flex flex-col justify-center items-center"
                >
                  <span className="text-gray-500 mt-2">Click to upload an image</span>
                </label>
              </div>
            </div>
            {taskImage && (
              <div className="mt-2 text-sm text-gray-600">
                <p>Selected: {taskImage.name}</p>
                <img 
                  src={URL.createObjectURL(taskImage)} 
                  alt="Preview" 
                  className="mt-2 h-24 w-24 object-cover rounded-md"
                />
              </div>
            )}
          </div>
          </div>
          <button
            type="submit"
            className={`w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
