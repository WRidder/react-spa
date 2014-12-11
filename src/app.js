/**
 * React-spa initialization
 */

// Reflux config
var Reflux = require("reflux");
Reflux.nextTick(require('setimmediate2'));
Reflux.PublisherMethods.triggerAsync = Reflux.PublisherMethods.trigger;

// Init actions
require("./actions/resourceActions");
require("./actions/sessionActions");

// Init stores
require("./stores/question");
require("./stores/questions");
require("./stores/session");

// Data interface
var DI = require("./core/dataInterface");

// Init routes
var router = require('./core/router');

module.exports = {
  init: function() {
    console.log("init");
  },
  renderToDom: function(water) {
    // Check if initial data is available
    if (water) {
      require("./core/syncDataProvider").hydrate(water);
    }

    // Dom libraries
    require("./libraries/foundation");

    // Init session
    require("./helper/initSession");

    // Render
    router.renderToDom();

    // Clear initial data
    require("./core/syncDataProvider").dry();
  },
  renderToString: function(path, water, profile) {
    // Init data interface profiler
    DI.enableProfiling(profile);

    // Hydrate data
    require("./core/syncDataProvider").hydrate(water || {});

    // Init session
    require("./helper/initSession");

    // Render application
    return router.renderToString(path || "/");
  },
  getProfile: function() {
    return DI.getProfile();
  }
};
