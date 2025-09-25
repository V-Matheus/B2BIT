import React from 'react';
import './styles/index.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <ToastContainer />
      <Outlet />
    </div>
  );
};

export default App;
