var socket = io();
function scrollFunction() {
  var message=jQuery('#message');
  var newMessage=message.children("li:last-child")

  var clientHeight=message.prop('clientHeight')
  var scrollTop=message.prop('scrollTop')
  var scrollHeight=message.prop('scrollHeight')

  var newMessageHeight=newMessage.innerHeight()
  var lastMessageHeight=newMessage.prev().innerHeight()

  if(clientHeight + scrollTop+newMessageHeight+lastMessageHeight >=scrollHeight){
    message.scrollTop(scrollHeight)
  }
}
socket.on("connect", () => {
  console.log("connected to server");
 var params= jQuery.deparam(window.location.search)
 socket.emit('join', params,function(err){
  if(err){
    alert(err)
    window.location.href='/'
  }else{
    console.log('no err')
  }
 })
 
});
socket.on("disconnect", () => {
  // console.log("User Was Disconnected ");
});

socket.on("newMessage", (message) => {
  var formated = moment(message.createdAt).format("hh:mm a");

  var template = jQuery("#message-template").html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formated,
  });

  jQuery("#message").append(html);
  scrollFunction();
});

jQuery("#message-form").on("submit", function (e) {
  e.preventDefault();
  var message = jQuery("[name=message]");
  socket.emit(
    "createMessaege",
    {
      from: "user",
      text: message.val(),
    },
    function () {
      message.val("");
    }
  );
});

var locationButton = jQuery("#send-location");
locationButton.on("click", function () {
  if (!navigator.geolocation) {
    return alert("geolocation not supported by yoyr location");
  }
  navigator.geolocation.getCurrentPosition(
    function (position) {
      socket.emit("createLocation", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    function () {
      alert("Unable to fech location");
    }
  );
});

socket.on("newLocation", function (message) {
  var formated = moment(message.createdAt).format("hh:mm a");

  var template = jQuery("#loction__template").html();
  var html = Mustache.render(template, {
    url: message.urlL,
    from: message.from,
    createdAt: formated,
  });

  jQuery("#message").append(html);
  scrollFunction();
});
