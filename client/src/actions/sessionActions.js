/**
 * Session actions
 *
 * For details on security, see: http://stackoverflow.com/questions/15051712/how-to-do-authentication-with-a-rest-api-right-browser-native-clients
 */

"use strict";
var reflux = require("reflux");
var dataInterface = require("local/core/dataInterface");

// Create actions
var actions = reflux.createActions([
  // Login
  "login",
  "loginFail",
  "loginSuccess",
  "loginError",

  // Register
  "register",
  "registerFail",
  "registerSuccess",

  // Session
  "sessionRetrieve",
  "sessionUpdate",

  // Logout
  "logout",
  "logoutSuccess",
  "logoutError",

  // Set session info
  "setLoginReturnPath",

  // Password check script
  "loadPasswordChecker",
  "loadPasswordCheckerSuccess",
  "loadPasswordCheckerFail"
]);
module.exports = actions;

// Action handlers
actions.login.listen(function(username, password) {
  dataInterface.post("/auth/login", {username: username, password: password})
    .then(function(data) {
      if (data.success) {
        actions.loginSuccess(data.user);
      }
      else {
        actions.loginFail(data.message);
      }
    })
    .catch(function(jqXHR, textStatus, errorThrown) {
      actions.loginError(textStatus, errorThrown);
    });
});

actions.logout.listen(function(username, password) {
  dataInterface.post("/auth/logout")
    .then(function(data) {
      actions.logoutSuccess();
    })
    .catch(function(jqXHR, textStatus, errorThrown) {
      actions.logoutError(textStatus, errorThrown);
    });
});

actions.register.listen(function(username, password) {
  console.warn("React-spa demo: Registration not yet implemented");
});

actions.loadPasswordChecker.listen(function() {
  dataInterface.loadScript("/js/vendor/zxcvbn.js")
    .then(function() {
      actions.loadPasswordCheckerSuccess();
    })
    .catch(function() {
      actions.loadPasswordCheckerError();
    });
});
