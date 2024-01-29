const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
var {isRealString} =require('./utils/validation')
const { generateMessage ,generateLocation} = require("./utils/message");
var publicPath = path.join(__dirname, "../public");

const app = express();
const server = http.createServer(app);
var io = socketIO(server);

io.on("connection", (socket) => {
  // console.log("new User connction");

  
  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name)|| !isRealString(params.room)){
      callback('name and room name are required')
    }
    socket.join(params.room)
    socket.emit("newMessage", generateMessage("admine", "welcome to chat app"));
  socket.broadcast.to(params.room).emit(
    "newMessage",
    generateMessage("admin", "new user joined")
  );
    callback()
       
  }) 
  socket.on("createMessaege", (message,callback) => {
    // console.log(message);

    io.emit("newMessage", generateMessage(message.from, message.text));
    callback()
  });
  socket.on('createLocation',(coords)=>{

  io.emit('newLocation',generateLocation('admin', coords.latitude, coords.longitude))
  })
  socket.on("disconnect", () => {
    // console.log("userwas disconnected");
  });
});

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

server.listen(port, () => {
  // console.log(`server is up on ${port}`);
});
