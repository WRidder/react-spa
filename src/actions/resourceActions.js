var reflux = require("reflux");
var dataInterface = require("./../core/dataInterface");

// Create actions
var actions = reflux.createActions([
  // Get
  "loadResource",
  "loadResourceSuccess",
  "loadResourceFail",

  // Create
  "createResource",
  "createResourceSuccess",
  "createResourceFail",

  // Update

  // Remove

  // Error
  "resourceNotFound"
]);

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

actions.createResource.listen(function(type, data, navigateTo) {
  dataInterface.post("/api/" + [type].filter(function(e){return e;}).join("/"), data)
    .then(function(data) {
      actions.createResourceSuccess(type, data);

      // Navigate to resource
      if (navigateTo) {
        var router = require("./../core/router").router;
        var urlCreator = require("./../helper/resourceUrlCreator");
        var url = urlCreator(type, data);
        router.transitionTo(url);
      }
    })
    .catch(function(jqXHR, textStatus, errorThrown) {
      actions.createResourceFail(type, id, childrenType, textStatus, errorThrown);
    });
});

module.exports = actions;
