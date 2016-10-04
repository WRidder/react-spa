var restify = require('restify'),
    User = require('../models/user.js');
var jwt = require("jwt-simple");

module.exports.register = function(req, res, next) {
    User.register(
        req.params,
        function onSuccess(user) {
            res.send(201, {id: user._id});
            return next();
        },
        function onError() {
            return next(new restify.InvalidArgumentError('User creation failed.'));
        }
    );
};

module.exports.getToken = function(req, res, next) {
  if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
    User.checkAuth(
      email, password,
      function(user) {
        var payload = {id: user.id};
        var token = jwt.encode(payload, "GJSSecret");
        res.json({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: token
        });
        return next();
      },
      function() {
        res.send(401);
      }
    );
  } 
  else {
    res.send(401);
  }
};

module.exports.checkToken = function(req, res, next) {
    User.getUser(
      req.user.id,
      function(user) {
        var payload = {id: user.id};
        var token = jwt.encode(payload, "GJSSecret");
        res.json({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: token
        });
        return next();
      },
      function() {
        res.send(401);
      }
    );
};

module.exports.getUser = function(req, res, next) {
  if (req.user.id) {
    User.getUser(
      req.user.id,
      function(user) {
        res.json(user);
        return next();
      },
      function() {
        res.send(401);
      }
    );
  }
  else {
    res.send(401);
  }
};
