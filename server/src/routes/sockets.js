var sio = require("../config/sockets");

sio.on('connection', function (socket) {
  var session = socket.request.session;
  console.log("Socket connected");

  socket.emit('news', {hello: 'world'});
  socket.on('sessionInfo', function (data) {
    socket.emit('news', session);
  });
});

