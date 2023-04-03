 
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from "react";
import Navigation from './components/Nav';
import ScrollToTop from './components/ScrollToTop';
import { io } from "socket.io-client";
import Detailsall from "./pages/Detailsall";
import AddDetail from './pages/AddDetail';
import OneLocationDetail from './pages/OneLocationDetail';
function App() {
  const user = useSelector((state) => state.user);


  return (
    <div className="App">
       <BrowserRouter>
       <ScrollToTop/>
       <Navigation/>
       <Routes>
        <Route index element={<Detailsall />}/>

      
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Detailsall" element={<Detailsall />} />
            <Route path="/Adddetail" element={<AddDetail />} />
            <Route path="/Onedetail" element={<OneLocationDetail />} />

       </Routes>

       </BrowserRouter>
    </div>
  );
}

export default App;
