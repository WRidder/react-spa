var sessionActions = require("client/actions/sessionActions");
var dataInterface = require("client/core/dataInterface");

// Check session
dataInterface.get("/auth/session")
  .then(function(data) {
    if (data.id) {
      sessionActions.loginSuccess(data);
    }
});
