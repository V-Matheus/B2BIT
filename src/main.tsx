import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import './styles/globalStyles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Profile } from './components/Profile.tsx';
import { Auth } from './components/Auth.tsx';
import { middleware } from './middleware.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Auth />,
        loader: ({ request }) => middleware(request),
      },
      {
        path: '/profile',
        element: <Profile />,
        loader: ({ request }) => middleware(request),
      },
    ],
  },
  {
    path: '*',
    loader: ({ request }) => middleware(request),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
