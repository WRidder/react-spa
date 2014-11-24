/**
 * See: https://github.com/scotch-io/easy-node-authentication
 */

var LocalStrategy = require('passport-local').Strategy;
var db = require("./../database/db");
var _ = require("lodash");
var User = require("./../database/models/user");

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null,{
      id: user.get("id"),
      username: user.get("username")
    });
  });
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, username, password, done) {
      // Create user
      User.createUser(username, password).then(function(result) {
        // On fail
        if (!result.success) {
          return done(null, false, req.flash('signupMessage', result.message));
        }

        // On success
        return done(null, {
          id: result.model.get("id"),
          username: result.model.get("username")
        });
      });
    }));

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'
  passport.use("local-login", new LocalStrategy({
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    function (req, username, password, done) {
      process.nextTick(function () {
        var user = User.getByUsername(username);

        if (!user) {
          return done(null, false, req.flash('loginMessage', "Username and/or password invalid"));
        }

        User.validatePassword(user, password).then(function(valid) {
          if (!valid) {
            return done(null, false, req.flash('loginMessage', "Username and/or password invalid"));
          }
          return done(null, user);
        });
      });
    }
  ));
};
