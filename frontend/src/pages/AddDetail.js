import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


  //labelStyles function
  const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

  //Add Detail function
  const AddDetail = () => {
    const User = useSelector((state) => state.user);
    //Use of styles from mui system
    //Use of navigate from react router dom

      useEffect(() => {
          console.log("userid", User._id);
       });
    const navigate = useNavigate();
    
    //implementing use state
    const [inputs, setInputs] = useState({
      SerialNumber: "",
      Type: "",
      image: "",
      Status: "",
      imageURL: ""
      });

    //Handle change function
    const handleChange = (e) => {
      setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    };

    //send request function
    const sendRequest = async () => {
        console.log("User", User._id);
      const res = await axios.post("http://localhost:4000/device/addDevice", {
        SerialNumber: inputs.SerialNumber,
        Type: inputs.Type,
        image: inputs.image,
        Status: inputs.Status,
        user: User._id,
         }).catch((err) => console.log(err));
      const data = await res.data;
        return data;
    };

    //handle submit function
    const handleSubmit = (e) => {
      e.preventDefault();

      sendRequest()
        .then((data) => console.log("d", data))
        .then(() => navigate("/Detailsall"));
    };  
    
    //Form for device submisssion
    return (
      <div className="device">
         
         <br></br>  <br></br>     <br></br>       <br></br>       <br></br>

        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="linear-gradient(90deg, rgba(255,252,13,1) 60%, rgba(110,224,200,1) 100%, rgba(169,175,14,1) 100%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection={"column"}
            width={"70%"}
          >
          <Typography
            fontWeight={"bold"}
            padding={3}
            color="black"
            variant="h2"
            textAlign={"center"}
          >
            Submit Your Device Details
          </Typography>
          <InputLabel sx={labelStyles}>SerialNumber</InputLabel>
          <TextField
            name="SerialNumber"
            onChange={handleChange}
            value={inputs.SerialNumber}
            margin="auto"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>Type</InputLabel>
          <TextField
            name="Type"
            onChange={handleChange}
            value={inputs.Type}
            margin="auto"
            variant="outlined"
          />
           <InputLabel sx={labelStyles}>image URL</InputLabel>
          <TextField
            name="image"
            onChange={handleChange}
            value={inputs.image}
            margin="auto"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}> Status </InputLabel>
          <TextField
            name="Status"
            onChange={handleChange}
            value={inputs.Status}
            margin="auto"
            variant="outlined"
          />

          <Button
          
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit" 
          >
            {" "}
            Submit
          </Button>
         </Box>
        </form>
      </div>
    );
  };
  //AddFeedback
  export default AddDetail;
