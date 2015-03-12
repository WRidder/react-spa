"use strict";
var restApiActions = require("local/actions/resourceActions");
var Reflux = require("reflux");
var Immutable = require("immutable");

var resourceStore = Reflux.createStore({
  listenables: restApiActions,
  data: Immutable.List([]),
  resourceDef: {
    type: "comments",
    id: null,
    childrenType: null
  },
  getInitialState: function() {
    return this.data;
  },

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

  // Helpers
  forThisStore: function(type, id, childrenType) {
    id = (this.resourceDef.id) ? !!id : !id;
    return type === this.resourceDef.type && id && childrenType === this.resourceDef.childrenType;
  },

  // Event handlers
  onLoadResourceSuccess: function(type, id, childrenType, data) {
    if (this.forThisStore.apply(null, arguments)) {
      this.data = Immutable.fromJS(data);
      this.trigger(this.data);
    }
  },
  onLoadResourceFail: function(type, id, childrenType) {
    if (this.forThisStore.apply(null, arguments)) {
      console.log("comments loading failed!");
    }
  }
});

module.exports = resourceStore;
