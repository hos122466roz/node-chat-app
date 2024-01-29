const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const { generateMessage ,generateLocation} = require("./utils/message");
var publicPath = path.join(__dirname, "../public");

const app = express();
const server = http.createServer(app);
var io = socketIO(server);

io.on("connection", (socket) => {
  // console.log("new User connction");

  socket.emit("newMessage", generateMessage("admine", "welcome to chat app"));
  socket.broadcast.emit(
    "newMessage",
    generateMessage("admin", "new user joined")
  );

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
