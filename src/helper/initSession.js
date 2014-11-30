var sessionActions = require("./../actions/sessionActions");
var dataInterface = require("./../core/dataInterface");

// Check session
dataInterface.get("/auth/session")
  .then(function(data) {
    if (data.id) {
      sessionActions.loginSuccess(data);
    }
});
