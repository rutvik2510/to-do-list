import React from 'react';

const TaskCard = ({ title, description, priority, status, dueDate, imageUrl }) => {
  // Format the due date
  const formattedDueDate = new Date(dueDate).toLocaleDateString();

  // Get class for status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Moderate':
        return 'text-blue-600';
      case 'In Progress':
        return 'text-yellow-500';
      case 'Completed':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white text-black p-5 mt-2 rounded-lg shadow-lg max-w-md h-auto">
      {/* Header - Title and Status */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-5 h-5 border-2 border-blue-500 rounded-full mr-3"></div>
          <p className="text-lg font-semibold">{title}</p>
        </div>
       
      </div>

      {/* Task Details and Image */}
      <div className="flex justify-between h-20">
        {/* Description */}
        <div className="flex-grow w-3/4 h-full">
          <p className="text-sm text-gray-500 line-clamp-2 overflow-hidden">
            {description}
          </p>
        </div>

        {/* Image */}
        {imageUrl && (
          <div className="ml-4 w-1/4 h-full">
            <img
              className="w-full h-full rounded-lg object-cover"
              src={imageUrl ? `http://localhost:5000${imageUrl}` : 'https://via.placeholder.com/150'}
              alt="Task"
            />
          </div>
        )}
      </div>

      {/* Footer - Priority and Due Date */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-sky-500">
          <span className="text-black">Priority:</span> {priority}
        </p>
        <p className={`text-xs font-semibold ${getStatusColor(status)}`}>
        <span className="text-black"> Status: </span>{status}
        </p>
        <p className="text-sm text-gray-400">
          Due: {formattedDueDate}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
