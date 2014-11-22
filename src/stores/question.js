var Reflux = require("reflux");
var Immutable = require("immutable");
var Router = require("react-router");

var restActions = require("./../actions/restApiActions");

var QuestionStore = Reflux.createStore({
  resourceDef: {
    type: "questions",
    id: true,
    childrenType: null
  },
  forThisStore: function(type, id, childrenType) {
    id = (this.resourceDef.id) ? !!id : !id;
    return type == this.resourceDef.type && id && childrenType == this.resourceDef.childrenType;
  },
  data: Immutable.List([]),
  listenables: restActions,
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
      console.log("single question loading failed!");
    }
  },
  getInitialState: function() {
    return this.data;
  }
});
module.exports = QuestionStore;
