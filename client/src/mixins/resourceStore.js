/**
 * Resource store mixin
 *
 * Meant for stores listening to resource actions. This mixin determines whether a resource belongs to this store.
 *
 * A store requires the following definition to be set:
 *   resourceDef: {
      // Type of resource
      type: "comments",
      // Specify id if a specific resource needs to be loaded
      id: null,
      // Specify children type if this resource is a children of a particular resource
      childrenType: null
    }
 */

"use strict";
var Immutable = require("immutable");

var resourceStoreMixin = {
  // Initial state getter
  getInitialState: function() {
    return this.data;
  },

  // Check if resource is tied to this store
  forThisStore: function (type, id, childrenType) {
    var resType = this.resourceDef.type;
    var resId = this.resourceDef.id;
    var resChildrenType = this.resourceDef.childrenType;

    // Type
    var valid = type === resType;

    // Id
    valid = (typeof resId === "number" || typeof resId === "string") ? (id === resId && valid) : valid;

    // ChilrenType
    valid = (typeof resChildrenType === "string") ? (childrenType === resChildrenType && valid) : valid;

    return valid;
  },

  // Event handlers
  onLoadResource: function(type, id, childrenType) {
    if (this.forThisStore.apply(null, arguments)) {
      this.data = Immutable.Map({});
    }
  },
  onLoadResourceSuccess: function (type, id, childrenType, data) {
    if (this.forThisStore.apply(null, arguments)) {
      this.data = Immutable.fromJS(data);
      this.trigger(this.data);
    }
  },
  onLoadResourceFail: function (type, id, childrenType) {
    if (this.forThisStore.apply(null, arguments)) {
      console.warn(this.storeName + ": Resource " + this.resourceDef.type + " loading failed!");
    }
  }
};

module.exports = resourceStoreMixin;
