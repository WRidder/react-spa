"use strict";
var restApiActions = require("local/actions/resourceActions");
var Reflux = require("reflux");
var Immutable = require("immutable");

var QuestionsStore = Reflux.createStore({
  storeName: "QuestionsStore",
  listenables: restApiActions,
  data: Immutable.List([]),
  resourceDef: {
    type: "questions"
  },
  getInitialState: function() {
    return this.data;
  },

  // Helpers
  forThisStore: function(type, id, childrenType) {
    return type === this.resourceDef.type && !id && !childrenType;
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
      console.log("questions loading failed!");
    }
  }
});
module.exports = QuestionsStore;
