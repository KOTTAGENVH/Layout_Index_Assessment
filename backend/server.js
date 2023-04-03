const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
require('dotenv').config();
require('./connection');
const server = http.createServer(app);
const {Server} = require('socket.io');

const io = new Server(server, {
  cors: '*',
  methods:'*'
})

const userRoutes = require('./routes/UserRoutes');
const deviceRoutes = require('./routes/DeviceRoute');
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/device', deviceRoutes);


server.listen(4000, () => {
    console.log("server running at port", 4000);
  });

  app.set("socketio", io);