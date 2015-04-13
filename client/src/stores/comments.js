"use strict";
var restApiActions = require("local/actions/resourceActions");
var Reflux = require("reflux");
var Immutable = require("immutable");
var resourceStoreMixin = require("local/mixins/resourceStore");

var resourceStore = Reflux.createStore({
  mixins: [resourceStoreMixin],
  listenables: restApiActions,
  data: Immutable.List([]),
  resourceDef: {
    type: "comments",
    id: null,
    childrenType: null
  }

/*  // Semi factory pattern similar to below. However, that's focused on a single active instance while we're targeting for more.
  statics: {
    mountedInstances: [],
    getActiveInstance: function () {
      var length = resourceStore.mountedInstances.length;
      if (length > 0) {
        return resourceStore.mountedInstances[length - 1];
      }
    }
  },

  isActive: function () {
    return this === resourceStore.getActiveInstance();
  },

  componentWillMount: function () {
    resourceStore.mountedInstances.push(this);
    resourceStore.updateDocumentTitle();
  },

  componentDidUpdate: function (prevProps) {
    if (this.isActive() && prevProps.title !== this.props.title) {
      resourceStore.updateDocumentTitle();
    }
  },

  componentWillUnmount: function () {
    var index = resourceStore.mountedInstances.indexOf(this);
    resourceStore.mountedInstances.splice(index, 1);
    resourceStore.updateDocumentTitle();
  },*/
});

module.exports = resourceStore;
