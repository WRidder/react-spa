"use strict";
var Reflux = require("reflux");
var Immutable = require("immutable");
var resourceStoreMixin = require("local/mixins/resourceStore");
var resourceActions = require("local/actions/resourceActions");

var QuestionStore = Reflux.createStore({
  mixins: [resourceStoreMixin],
  storeName: "QuestionStore",
  listenables: resourceActions,
  data: Immutable.Map({}),
  getInitialState: function() {
    return this.data;
  },
  resourceDef: {
    type: "questions",
    id: true,
    childrenType: null
  }
});
module.exports = QuestionStore;
