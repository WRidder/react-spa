var restApiActions = require("./../actions/restApiActions");
var $ = require("jquery");

var componentTransition = function(type, id, childrenType) {
  return {
    statics: {
      willTransitionTo: function (transition, params) {
        var defer = $.Deferred();
        restApiActions.loadResource(type, params[id], childrenType, defer);
        transition.wait(defer.promise());
      }
    }
  };
};

module.exports = componentTransition;
