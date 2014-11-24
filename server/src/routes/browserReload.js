var app = require('http').Server()
var io = require('socket.io')(app);
app.listen(9000);

// File watcher
var chokidar = require('chokidar');
var path = require('path');
var watcher = chokidar.watch(path.resolve("../../build"), {ignored: /[\/\\]\./});

watcher.on("change", function(path, stats) {
  io.sockets.emit("serverFilesChanged");
});
