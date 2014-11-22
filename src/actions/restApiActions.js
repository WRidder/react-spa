var reflux = require("reflux");
var cfg = require("../config.json");
var $ = require("jquery");

// Create actions
var actions = reflux.createActions([
  // Get
  "loadResource",
  "loadResourceSuccess",
  "loadResourceFail",

  // Create

  // Update

  // Remove

  // Error
  "resourceNotFound"
]);
module.exports = actions;

// Action handlers
actions.loadResource.listen(function(type, id, childrenType, promise) {
  $.get(cfg.server.location + "api/" + [type, id, childrenType].filter(function(e){return e;}).join("/"))
    .done(function(data) {
      actions.loadResourceSuccess(type, id, childrenType, data);
      promise.resolve();
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      actions.loadResourceFail(type, id, childrenType, textStatus, errorThrown);
      promise.resolve();
    });
});
