/**
 * Created by wilbert on 14-11-14.
 */
var app = require('express')();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var passport = require('passport');
var flash    = require('connect-flash');
var sessionMiddleware = require("./sessionMiddleware");

// Allow cross domain for local client
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};

// Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use(sessionMiddleware);

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
