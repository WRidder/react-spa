/**
 * React-spa initialization
 */
"use strict";

// Reflux config
var Reflux = require("reflux");
Reflux.nextTick(require("setimmediate2"));
Reflux.PublisherMethods.triggerAsync = Reflux.PublisherMethods.trigger;

// Data interface
var DI = require("local/core/dataInterface");

module.exports = {
  init: function() {
    console.log("init");
  },
  renderToDom: function(water) {
    // Check if initial data is available
    if (water) {
      require("local/core/syncDataProvider").hydrate(water);
    }

    // React tap event plugin
    require("react-tap-event-plugin")();

    // Init routes
    var router = require("local/core/router");

    // Init stores
    require("local/stores/session");
    require("local/stores/question");
    require("local/stores/questions");

    // Temporary tap event plugin
    var injectTapEventPlugin = require("react-tap-event-plugin");
    injectTapEventPlugin();

    // Render
    router.renderToDom();

    // Clear initial data
    require("local/core/syncDataProvider").dry();
  },
  renderToString: function(path, water, profile) {
    // Init data interface profiler
    DI.enableProfiling(profile);

    // Hydrate data
    require("local/core/syncDataProvider").hydrate(water || {});

    // Init stores
    require("local/stores/session");
    require("local/stores/question");
    require("local/stores/questions");

    // Init routes
    var router = require("local/core/router");

    // Render html body
    var htmlBody = router.renderToString(path || "/");

    // Get document title
    var DocumentTitle = require("react-document-title");
    var docTitle = DocumentTitle.rewind();

    // Render application
    return {
      body: htmlBody,
      title: docTitle
    };
  },
  getProfile: function() {
    return DI.getProfile();
  }
};
