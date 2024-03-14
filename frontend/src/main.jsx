import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './page/home.jsx';
import Login from './page/login.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>,
    children: [
      {
        path: 'login',
        element:<Login/>
      },
      {
        path: '/',
        element: <Home />
      }
    ]
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
       <App />
    </RouterProvider>
  </React.StrictMode>,
)
