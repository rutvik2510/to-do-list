import React from 'react';
import CompleteIcon from '../assets/Task_Complete.png';

const CompletedTasks = ({ tasks }) => {
  const completedTasks = tasks.filter(task => task.status === 'Completed');

  return (
    <div className="max-w-lg mx-auto bg-white p-4  shadow-lg rounded-lg overflow-hidden ">
      <div className="px-6 py-4">
      <div className="flex items-center font-bold text-lg text-red-600 mb-4">
          <img src={CompleteIcon} alt="Complete Icon" className="w-6 h-6 mr-2" />
          Completed Tasks
        </div>

        {completedTasks.length === 0 ? (
          <p className="text-gray-600 text-sm">No tasks completed yet.</p>
        ) : (
          completedTasks.map((task) => (
            <div key={task._id} className="bg-white p-4 mb-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-start">
              <div className="flex items-start">
                <input type="checkbox" className="mr-3 mt-1 " checked disabled />
                <div>
                  <div className="font-semibold text-black">{task.title}</div>
                  <div className='flex justify-between h-20'>
                      <div className='flex-grow w-3/4 h-full'>
                  <p className="text-sm text-gray-500 line-clamp-2 overflow-hidden">
                      {task.description}
                      </p>
                      </div>
                      <div className="ml-4 w-1/4 h-full">
                          <img
              className="w-full h-full rounded-lg object-cover"
              src={task.taskimage ? `http://localhost:5000${task.taskimage}` : 'https://via.placeholder.com/150'}
              alt="Task"
            />
          </div>
          </div>
                  <p className="text-xs text-green-500 mt-2"> <span className='text-black'>Status</span>: Completed</p>
                  <p className="text-xs text-gray-400">Completed {task.completedDate || 'recently'}.</p>
                </div>
              </div>
             
        
        
              {/* <img
                src={task.taskimage `http://localhost:5000${imageUrl}` || 'https://via.placeholder.com/50'}
                alt={task.title}
                className="rounded-md w-16 h-16 object-cover"
              /> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CompletedTasks;
