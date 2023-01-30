import React from 'react';

import Registration from './pages/Registration';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path='/home' element={<Home />}></Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
