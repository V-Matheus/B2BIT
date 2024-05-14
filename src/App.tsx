import React from 'react';
import './styles/index.css';
import { Auth } from './components/Auth';

const App: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Auth />
    </div>
  );
};

export default App;
