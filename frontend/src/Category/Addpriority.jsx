import React, { useState } from "react";

const AddPriority = () => {
  // Use level instead of cname
  const [formData, setFormData] = useState({
    level: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change for dropdown
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation to check if level is selected
    if (!formData.level.trim()) {
      setError("Priority level is required");
      setSuccess("");
      return;
    }

    try {
      // Making the POST request to the backend API
      const response = await fetch("http://localhost:5000/api/priority/addpriority", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the token for authentication
        },
        body: JSON.stringify({ level: formData.level }), // Send the form data
      });

      const result = await response.json();

      if (!response.ok) {
        // If the response is not ok, set the error message
        setError(result.message || "Failed to add Priority");
        setSuccess("");
      } else {
        // Success, clear form and display success message
        setFormData({ level: "" });
        setError("");
        setSuccess(result.message);
      }
    } catch (error) {
      setError("Server error. Please try again later.");
      setSuccess("");
    }
  };

  // Handle form reset on cancel
  const handleCancel = () => {
    setFormData({ level: "" });
    setError("");
    setSuccess("");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <form onSubmit={handleSubmit}>
          {/* Priority level dropdown */}
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select priority level</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Extreme">Extreme</option>
          </select>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none"
            >
              Create
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPriority;
