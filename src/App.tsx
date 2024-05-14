import React from 'react';
import './styles/index.css';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default App;
