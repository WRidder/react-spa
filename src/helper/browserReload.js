// Reloads the browser if source files on the server change

var io = require('socket.io-client')();

io.on('serverFilesChanged', function (data) {
  window.location.reload(true);
});
