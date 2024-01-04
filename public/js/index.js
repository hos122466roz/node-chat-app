var socket = io();
socket.on("connect", () => {
  console.log("connected to server");

  // socket.emit("createMessaege", {
  //   from: "info@roxo.ir",
  //   text: "hellow , Oops my name is hpsein",
  // });
});
socket.on("disconnect", () => {
  // console.log("User Was Disconnected ");
});

socket.on("newMessage", (message) => {

  var li=jQuery('<li></li>')
  li.text(`${message.from} : ${message.text}`)
  jQuery('#message').append(li)
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit("createMessaege", {
    from: "user",
    text: jQuery("[name=message]").val(),
  });
});
