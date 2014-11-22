/**
 * Created by wilbert on 14-11-14.
 *
 * see: http://stackoverflow.com/questions/19024878/simple-login-page-in-nodejs-using-express-and-passport-with-mongodb
 */

var passport = require('passport');

module.exports = {

  // Login a user
  login: passport.authenticate('local-login', {
    successRedirect: '/auth/login/success',
    failureRedirect: '/auth/login/failure',
    failureFlash : true // allow flash messages
  }),

  // on Login Success callback
  loginSuccess: function(req, res){
    res.json({
      success: true,
      user: req.session.passport.user
    });
  },

  // on Login Failure callback
  loginFailure: function(req, res){
    res.json({
      success: false,
      message: req.flash('loginMessage')
    });
  },

  // Log out a user
  logout: function(req, res){
    req.logout();
    res.end();
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
      user: req.session.passport.user
    });
  },

  // on Signup Failure callback
  signupFailure: function(req, res){
    res.json({
      success:false,
      message: req.flash('signupMessage')
    });
  }
};
