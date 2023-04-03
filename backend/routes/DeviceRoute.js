const router = require("express").Router();
const mongoose = require("mongoose");
const Device = require("../models/Device");
const User = require("../models/User");

//get all Devices 
router.get("/getallDevices", async (req, res) => {
  let devices;
  try {
    devices = await Device.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!devices) {
    return res.status(404).json({ message: "No DEvices Found" });
  }
  return res.status(200).json({ devices });
});



//addDevices
router.post("/addDevice", async (req, res) => {
    const { SerialNumber, Type, image,Status, user } = req.body;
  
    let existingUser;
    try {
      existingUser = await User.findById(user);
    } catch (err) {
      return console.log(err);
    }
    if (!existingUser) {
      return res.status(400).json({ message: "Unable To Find User By this ID" });
    }
    const device = new Device({
      SerialNumber,
      Type,
      image,
      Status,
      user,
    });

    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await device.save({ session });
      await existingUser.save({ session });
      await session.commitTransaction();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
    return res.status(200).json({ device });
  });


//Delete device
router.delete("/deleteDevice/:id", async (req, res) => {
  const { id } = req.params;
  let device;
  try {
    device = await Device.findByIdAndRemove(id).populate("user");
    // console.log(device);
    await device.user.devices.pull(device);
    await device.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!device) {
    return res.status(500).json({ message: "Unable To Delete" });
  }

  return res.status(200).json({ message: "Successfull Delete" });
});

//Get a device based on the location
router.get("/duser/:id", async (req, res) => {
  const userId = req.params.id;
  let PerDevice;
  try {
    PerDevice = await Device.find({ user: userId }).populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!PerDevice) {
    return res.status(404).json({ message: "No Device in this location Found" });
  }
  return res.status(200).json({ user: PerDevice });
});

module.exports = router;
