/**
 * see: http://stackoverflow.com/questions/19024878/simple-login-page-in-nodejs-using-express-and-passport-with-mongodb
 */
"use strict";
var passport = require('passport');
var _ = require("lodash");

module.exports = {
  // User login
  login: function(req, res, next) {
    passport.authenticate('local-login', function (err, user) {
      if (user) {
        // Create session
        req.logIn(user, function(err) {
          if (err) {
            res.json({
              success: false,
              message: "Error establishing session"
            });
          }
          else {
            res.json({
              success: true,
              user: {
                id: user.get("id"),
                username: user.get("username")
              }
            });
          }
        });
      }
      else
        var flashMsg = req.flash('loginMessage');
        var msg = _.isArray(flashMsg) ? _.first(flashMsg) : flashMsg;
        res.json({
          success: false,
          message: msg
        });
    })(req, res, next);
  },

  // Log out a user
  logout: function(req, res){
    req.logout();
    // Respond with json. Empty response (res.end()) raises an error in firefox.
    res.json({
      success: true
    });
  },

  // process the signup form
  signup: passport.authenticate('local-signup', {
    successRedirect : '/auth/signup/success', // redirect to the secure profile section
    failureRedirect : '/auth/signup/failure', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }),

  // on Signup Success callback
  signupSuccess: function(req, res){
    res.json({
      success: true,
      user: req.user
    });
  },

  // on Signup Failure callback
  signupFailure: function(req, res){
    res.json({
      success:false,
      message: req.flash('signupMessage')
    });
  },

  checkSession: function(req, res) {
    if (req.isAuthenticated()) {
      res.json(req.user);
    }
    else {
      res.json({
        message: "no session found"
      });
    }
  }
};
