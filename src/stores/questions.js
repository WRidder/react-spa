var restApiActions = require("./../actions/restApiActions");
var Reflux = require("reflux");
var Immutable = require("immutable");

var QuestionsStore = Reflux.createStore({
  listenables: restApiActions,
  data: Immutable.List([]),
  resourceDef: {
    type: "questions",
    id: null,
    childrenType: null
  },

  // Event handlers
  onLoadResource: function(type, id, childrenType) {
    if (this.forThisStore.apply(null, arguments)) {
      this.data = Immutable.List([]);
    }
  },
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
  },

  // Helpers
  forThisStore: function(type, id, childrenType) {
    id = (this.resourceDef.id) ? !!id : !id;
    return type == this.resourceDef.type && id && childrenType == this.resourceDef.childrenType;
  },
  getInitialState: function() {
    return this.data;
  }
});
module.exports = QuestionsStore;
