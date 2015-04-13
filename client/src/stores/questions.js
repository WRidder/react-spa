"use strict";
var restApiActions = require("local/actions/resourceActions");
var Reflux = require("reflux");
var Immutable = require("immutable");
var resourceStoreMixin = require("local/mixins/resourceStore");

var QuestionsStore = Reflux.createStore({
  mixins: [resourceStoreMixin],
  storeName: "QuestionsStore",
  listenables: restApiActions,
  data: Immutable.List([]),
  resourceDef: {
    type: "questions"
  }
});
module.exports = QuestionsStore;
