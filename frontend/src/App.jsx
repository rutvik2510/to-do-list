import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/Login'; 
import Register from './pages/Register';
import Dashboard from './Components/Dashboard';
import TaskDashboard from './Task/TaskDashboard'

const App = () => {
  return (
    <div>
      <Routes>
        
        <Route path="/" element={<SignIn />} />

        
        <Route path="/login" element={<SignIn />} />

        
        <Route path="/register" element={<Register />} />

        <Route path="/Dashboard/*" element={<Dashboard />} />
        
      </Routes>
    </div>
  );
};

export default App;
