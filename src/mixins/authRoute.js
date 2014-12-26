var sessionStore = require("client/stores/session");
var connect= require("client/libraries/tmp_connect");

var authRoute = {
  mixins: [connect(sessionStore, "session")],
  statics: {
    willTransitionTo: function (transition, params) {
      if (!sessionStore.isLoggedIn()) {
        transition.redirect("login");
      }
    }
  },
  componentWillUpdate: function() {
    var router = require("client/core/router").router;
    if (!sessionStore.isLoggedIn()) {
      router.transitionTo("login");
    }
  }
};

module.exports = authRoute;
