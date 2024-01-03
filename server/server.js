const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
var publicPath = path.join(__dirname, "../public");

const app = express();
const server = http.createServer(app);
var io = socketIO(server);

io.on("connection", (socket) => {
  console.log("new User connction");

  socket.on("createMessaege", (message) => {
    console.log(message);

    socket.emit("newMessage", {
      from: message.from,
      text: "welcome to the app",
      createAt: new Date().getTime(),
    });

    socket.broadcast.emit("newMessage", {
      from: message.from,
      text: "new user joined",
      createAt: new Date().getTime(),
    });

    // io.emit("newMessage", {
    //   from: message.from,
    //   text: message.text,
    //   createAt: new Date().getTime(),
    // });

    // socket.broadcast.emit("newMessage", {
    //   from: message.from,
    //   text: message.text,
    //   createAt: new Date().getTime(),
    // });
  });
  socket.on("disconnect", () => {
    console.log("userwas disconnected");
  });
});

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`server is up on ${port}`);
});
