const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const { generateMessage } = require("./utils/message");
var publicPath = path.join(__dirname, "../public");

const app = express();
const server = http.createServer(app);
var io = socketIO(server);

io.on("connection", (socket) => {
  // console.log("new User connction");

  socket.emit("newMessage", generateMessage("admine", "welcome to chat app"));
  socket.broadcast.emit("newMessage",generateMessage("admin", "new user joined"));
  
  socket.on("createMessaege", (message) => {
    // console.log(message);

    io.emit("newMessage", generateMessage(message.from, message.text));

    // socket.broadcast.emit("newMessage", {
    //   from: message.from,
    //   text: message.text,
    //   createAt: new Date().getTime(),
    // });
  });
  socket.on("disconnect", () => {
    // console.log("userwas disconnected");
  });
});

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

server.listen(port, () => {
  // console.log(`server is up on ${port}`);
});
