var reflux = require("reflux");
var dataInterface = require("./../core/dataInterface");

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

// Set sync
actions.loadResource.sync = true;
actions.loadResourceSuccess.sync = true;
actions.loadResourceFail.sync = true;

// Action handlers
actions.loadResource.listen(function(type, id, childrenType) {
  dataInterface.get("/api/" + [type, id, childrenType].filter(function(e){return e;}).join("/"))
    .then(function(data) {
      actions.loadResourceSuccess(type, id, childrenType, data);
    })
    .catch(function(jqXHR, textStatus, errorThrown) {
      actions.loadResourceFail(type, id, childrenType, textStatus, errorThrown);
    });
});
