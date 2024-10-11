import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TaskCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get your token here
        const categoriesData = await axios.get('http://localhost:5000/api/category/getallcategory', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const prioritiesData = await axios.get('http://localhost:5000/api/priority/getallpriority', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setCategories(categoriesData.data.category || []);
        setPriorities(prioritiesData.data.priority || []);
        console.log(categoriesData.data);
        console.log(prioritiesData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false); // Set loading to false whether successful or not
      }
    };

    fetchData();
  }, []);

  const handleDeleteCategory = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/category/deletecategory/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(prevCategories => prevCategories.filter(category => category._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Failed to delete category. Please try again.');
    }
  };
  
  const handleDeletePriority = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/priority/deletepriority/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPriorities(prevPriorities => prevPriorities.filter(priority => priority._id !== id));
    } catch (error) {
      console.error('Error deleting priority:', error);
      setError('Failed to delete priority. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="p-2 bg-gray-100">
      {error && <div className="text-red-500 mb-4">{error}</div>} {/* Error message */}

      {/* Category Section */}
      <div className="bg-white shadow-md rounded-lg p-2 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Task Categories</h2>
          <button 
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
            onClick={() => navigate('/Dashboard/add-category')}
          >
            Add Category
          </button>
        </div>
        <ul className="space-y-2">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category._id} className="flex justify-between items-center p-2 border-b">
                <span>{category.Cname}</span>
                <div>
                  <button className="text-blue-500 hover:underline mr-2" onClick={() => navigate(`/edit-category/${category._id}`)}>Edit</button>
                  <button className="text-red-500 hover:underline" onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                </div>
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No categories available.</li> // No categories message
          )}
        </ul>
      </div>

      {/* Priority Section */}
      <div className="bg-white shadow-md rounded-lg p-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Task Priorities</h2>
          <button 
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
            onClick={() => navigate('/Dashboard/add-priority')}
          >
            Add Priority
          </button>
        </div>
        <ul className="space-y-2">
          {priorities.length > 0 ? (
            priorities.map((priority) => (
              <li key={priority._id} className="flex justify-between items-center p-2 border-b">
                <span>{priority.level}</span>
                <div>
                  <button className="text-blue-500 hover:underline mr-2" onClick={() => navigate(`/edit-priority/${priority._id}`)}>Edit</button>
                  <button className="text-red-500 hover:underline" onClick={() => handleDeletePriority(priority._id)}>Delete</button>
                </div>
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No priorities available.</li> // No priorities message
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskCategory;
