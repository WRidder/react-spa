var sessionStore = require("client/stores/session");
var sessionActions = require("client/actions/sessionActions");
var connect= require("client/libraries/tmp_connect");
var State = require('react-router').State;

var authRoute = {
  mixins: [connect(sessionStore, "session"), State],
  statics: {
    willTransitionTo: function (transition, params) {
      if (!sessionStore.isLoggedIn()) {
        // Set return path
        sessionActions.setLoginReturnPath(transition.path);

        // Redirect
        transition.redirect("login");
      }
    }
  },
  componentWillUpdate: function() {
    var router = require("client/core/router").router;
    if (!sessionStore.isLoggedIn()) {
      // Set return path
      sessionActions.setLoginReturnPath(this.getPath());

      // Redirect
      router.transitionTo("login");
    }
  }
};

module.exports = authRoute;
