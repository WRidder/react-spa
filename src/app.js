/**
 * React-spa initialization
 */

// Reflux config
var Reflux = require("reflux");
Reflux.nextTick(require('setimmediate2'));
Reflux.PublisherMethods.triggerAsync = Reflux.PublisherMethods.trigger;

// Init actions
require("client/actions/resourceActions");
require("client/actions/sessionActions");

// Init stores
require("client/stores/question");
require("client/stores/questions");
require("client/stores/session");

// Data interface
var DI = require("client/core/dataInterface");

// Init routes
var router = require('client/core/router');

module.exports = {
  init: function() {
    console.log("init");
  },
  renderToDom: function(water) {
    // Check if initial data is available
    if (water) {
      require("client/core/syncDataProvider").hydrate(water);
    }

    // Init session
    require("client/helper/initSession");

    // Render
    router.renderToDom();

    // Clear initial data
    require("client/core/syncDataProvider").dry();
  },
  renderToString: function(path, water, profile) {
    // Init data interface profiler
    DI.enableProfiling(profile);

    // Hydrate data
    require("client/core/syncDataProvider").hydrate(water || {});

    // Init session
    require("client/helper/initSession");

    // Render application
    return router.renderToString(path || "/");
  },
  getProfile: function() {
    return DI.getProfile();
  }
};
