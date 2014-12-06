var Reflux = require("reflux");
var Immutable = require("immutable");
var Router = require("react-router");

var resourceActions = require("./../actions/resourceActions");

var QuestionStore = Reflux.createStore({
  listenables: resourceActions,
  data: Immutable.Map({}),
  getInitialState: function() {
    return this.data;
  },
  resourceDef: {
    type: "questions",
    id: true,
    childrenType: null
  },

  // Helpers
  forThisStore: function(type, id, childrenType) {
    id = (this.resourceDef.id) ? !!id : !id;
    return type == this.resourceDef.type && id && childrenType == this.resourceDef.childrenType;
  },

  // Action handlers
  onLoadResource: function(type, id, childrenType) {
    if (this.forThisStore.apply(null, arguments)) {
      this.data = Immutable.Map({});
    }
  },
  onLoadResourceSuccess: function(type, id, childrenType, data) {
    if (this.forThisStore.apply(null, arguments)) {
      this.data = this.data.merge(data);
      this.trigger(this.data);
    }
  },
  onLoadResourceFail: function(type, id, childrenType) {
    if (this.forThisStore.apply(null, arguments)) {
      console.log("single question loading failed!");
    }
  }
});
module.exports = QuestionStore;
