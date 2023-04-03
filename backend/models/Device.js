const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Device Model Containing data such as SerialNumber,Type,image,Status and particular users details as well
const DeviceSchema = new Schema({
  SerialNumber: {
    type: String,
    required: true,
  },

  Type: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  Status: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

});

const Device = mongoose.model("Device", DeviceSchema);

module.exports = Device;
