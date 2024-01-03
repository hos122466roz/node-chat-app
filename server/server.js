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
  socket.on('disconnected',()=>{
    console.log('userwas disconnected')
  })
});

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`server is up on ${port}`);
});
