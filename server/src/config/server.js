var settings = require("./../helpers/settings");

var express = require('express');
var app = express();
var server = require('http').Server(app);
var passport = require('passport');
var flash    = require('connect-flash');
var sessionMiddleware = require("./sessionMiddleware");
var compression = require('compression');

// Allow cross domain for local client
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.header('Access-Control-Allow-Origin', req.headers.origin);
  next();
};

// Express
app.use(allowCrossDomain);
app.use(sessionMiddleware);
app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  next();
});
app.use(compression({
  threshold: 1024
})); // gzip support; requires res.flush() for SSE!! (https://github.com/expressjs/compression#server-sent-events)

// Live reload support
if(!settings.disableLiveReload) {
  app.use(require('connect-livereload')({port: 35729}));
}

// Static file serving
app.use(express.static(__dirname + "/../../../build", {
  index: false
}));

// Passport
require('./passport')(passport); // pass passport for configuration
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Start the server
var port = process.env.PORT || 8080;
server.listen(port);

module.exports = {
  serverInstance: server,
  appInstance: app
};
