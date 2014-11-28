var sessionActions = require("./../actions/sessionActions");
var $ = require("jquery");

// Check session
$.get("http://" + window.location.host + "/auth/session")
  .done(function(data) {
    if (data.id) {
      sessionActions.loginSuccess(data);
    }
});
