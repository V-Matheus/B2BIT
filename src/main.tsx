import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import './styles/globalStyles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Profile } from './components/Profile.tsx';
import { Auth } from './components/Auth.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Auth />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
