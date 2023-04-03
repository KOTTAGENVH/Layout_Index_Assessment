import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

  //Devices & Loc function
    const Device = ({
      name,
      address,
      phone,
      SerialNumber,
      Type,
      image,
      Status,
      id,
      userid,
      User,
    }) => {
  
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const user = useSelector((state) => state.user);

  //Sending the delete request to the backend
    const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:4000/device/deleteDevice/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
      return data;
    };

//handle delete
    const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"));
      window.location.reload(false);
    };


    return (

      <div className="feedback">
      <Card
       sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
       }}
      >

      <CardContent>
        <hr />
        <br />
        <Typography
          /*className={classes.font}*/ variant="body2"
          color="text.secondary"
        >
          <p>SERIAL NUMBER : = <b>{SerialNumber}</b></p>
         <p> NAME OF THE USER 😊 : = <b>{name}</b> </p>
         <p>LOCATION 🗺️ : = <b>{address}</b></p> 
          <p>MOBILE NO. ☎️ : = <b>{phone}</b></p>
          <p>TYPE OF DEVICE 🖥️ : = <b>{Type}</b></p>
          <p>STATUS OF THE DEVICE : = <b>{Status}</b></p>
          <br/>

        </Typography>
      </CardContent>

      <CardMedia
        component="img"
        height="200"
        image={image}
        alt=""
      />
        <div>
        <button
  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
  onClick={() => handleDelete()}
>
  <FontAwesomeIcon icon={faTrash} className="mr-2" />
  Delete
</button>
        </div>
     
    </Card>
  </div>
  
     
  );
};
export default Device;
