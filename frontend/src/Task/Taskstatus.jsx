import React from 'react';

const TaskStatus = ({ completed, inProgress, notStarted }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-red-600 mb-4 flex items-center">
        <span className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v2h6v-2a5 5 0 00-10 0v2h6a5 5 0 00-10 0V5h16v12a4 4 0 001.02 3" />
          </svg>
        </span>
        Task Status
      </h2>
      <div className="flex justify-between">
        {/* Completed */}
        <div className="text-center">
          <div className="relative mb-2">
            <div className="w-24 h-24 rounded-full border-8 border-green-500 flex justify-center items-center">
              <span className="text-xl font-bold">{completed.toFixed(0)}%</span>
            </div>
          </div>
          <p className="text-green-500 font-semibold">Completed</p>
        </div>

        {/* In Progress */}
        <div className="text-center">
          <div className="relative mb-2">
            <div className="w-24 h-24 rounded-full border-8 border-blue-500 flex justify-center items-center">
              <span className="text-xl font-bold">{inProgress.toFixed(0)}%</span>
            </div>
          </div>
          <p className="text-blue-500 font-semibold">In Progress</p>
        </div>

        {/* Not Started */}
        <div className="text-center">
          <div className="relative mb-2">
            <div className="w-24 h-24 rounded-full border-8 border-red-500 flex justify-center items-center">
              <span className="text-xl font-bold">{notStarted.toFixed(0)}%</span>
            </div>
          </div>
          <p className="text-red-500 font-semibold">Not Started</p>
        </div>
      </div>
    </div>
  );
};

export default TaskStatus;
