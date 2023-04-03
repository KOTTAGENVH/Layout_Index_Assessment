import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Modal, Navbar, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import DisplayDetails from "./DisplayDetails";
import { useNavigate } from "react-router-dom";
import Device from "./DisplayDetails";

   const Devices = () => {
   //Use of react hooks
   const [devices, setDevices] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [Response, setResponse] = useState("");
   const loadTable = () => {};
   const navigate = useNavigate();
   

   const user = useSelector((state) => state.user);
   const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:4000/device/getallDevices")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
   };

 
   //React hooks and send request function to set devices
   useEffect(() => {
    sendRequest().then((data) => setDevices(data.devices));
   }, []);
   console.log(devices);

   const devicesearch = devices.filter((devices) => devices.SerialNumber.toLowerCase().includes(searchTerm.toLowerCase())||devices.user.address.toLowerCase().includes(searchTerm.toLowerCase()));
   console.log(devicesearch)

   return (
    <div>
      <br></br>  <br></br>     <br></br>       <br></br>       <br></br>

     <div className="filters-container d-flex justify-content-center pt-4 pb-4">
        <input type="search" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      {devicesearch.length===0 ? (
          <h1>No Devices Registered yet</h1>
       ):(
       <div>
       {devicesearch.map((device, index) => (
        console.log(device.type),
          <DisplayDetails
            id={device._id}
            isUser={localStorage.getItem("userId") === device.user._id}
            name={device.user.name}
            address={device.user.address}
            phone={device.user.phone}
            SerialNumber={device.SerialNumber}
            Type={device.Type}
            image={device.image}
            Status={device.Status}
            userid={device.user._id}
            user={device.user}
          />
         ))}
         </div>
       )}
    </div>
  );
};
export default Devices;
