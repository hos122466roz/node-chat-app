var socket = io();
socket.on("connect", () => {
  console.log("connected to server");

  socket.emit("createMessaege", {
    from: "info@roxo.ir",
    text: "hellow , Oops my name is hpsein",
  });

});
socket.on("disconnect", () => {
  console.log("User Was Disconnected ");
});

socket.on("newMessage", (message) => {
  console.log("New Email", message);
});
