import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AuthProvider from './Authentication/Authprovider';
import Home from './Layout/Home/Home';
import LandingPage from './Layout/Home/LandingPage';
import LogIn from './Authentication/LogIn';
import Register from './Authentication/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <LandingPage/>,
      },
      {
        path: "/logIn",
        element: <LogIn/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
