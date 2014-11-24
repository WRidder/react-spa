var reflux = require("reflux");
var cfg = require("../config.json");
var $ = require("jquery");

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
  "logoutError"
]);
module.exports = actions;

// Action handlers
actions.login.listen(function(username, password) {
    $.post("http://" + window.location.host + "/auth/login", {username: username, password: password})
    .done(function(data) {
      if (data.success) {
        actions.loginSuccess(data.user);
      }
      else {
        actions.loginFail(data.message);
      }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      actions.loginError(textStatus, errorThrown);
    });
});

actions.logout.listen(function(username, password) {
  $.get("http://" + window.location.host + "/auth/logout")
    .done(function(data) {
      actions.logoutSuccess();
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      actions.logoutError(textStatus, errorThrown);
    });
});
