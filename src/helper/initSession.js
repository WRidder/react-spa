var sessionActions = require("./../actions/sessionActions");
var cfg = require("../config.json");
var $ = require("jquery");

// Check session
$.get("http://" + window.location.host + "/auth/session")
  .done(function(data) {
    if (data.id) {
      sessionActions.loginSuccess(data);
    }
});
