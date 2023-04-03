import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DisplayDetails from "./DisplayDetails";
//DeviceDetails function
const DisplayDetail = () => {
    const userid = useSelector((state) => state.user._id);
  //Use of use state react hooks
  const [device, setDevice] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const id = useParams().id;
  console.log(id);


  //Fetch details function to fetch details from the backend
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:4000/device/duser/` + userid)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  //Reacthooks (Use Effect to update the data)
  useEffect(() => {
    fetchDetails().then((data) => {
        setDevice(data.user);
      console.log(data.user);
    });
  },);
  //Device Search
  const devicesearch = device.filter((devices) => devices.SerialNumber.toLowerCase().includes(searchTerm.toLowerCase())||devices.user.address.toLowerCase().includes(searchTerm.toLowerCase()));
  console.log(devicesearch)
  
  return (
    <div>
           <br></br>  <br></br>     <br></br>       <br></br>       <br></br>
    <div className="filters-container d-flex justify-content-center pt-4 pb-4">
                <input type="search" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            {devicesearch.length===0 ? (
                <h1>No Devices yet</h1>
            ):(
     <div>
        {devicesearch.map((device, index) => (
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

export default DisplayDetail;
