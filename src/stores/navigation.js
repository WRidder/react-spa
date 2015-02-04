/**
 * Created by Wilbert vd Ridder on 4-2-2015.
 *
 * Todo:
 * - Emit event upon navigation
 * - Create breadcrumbs
 */
var Reflux = require("reflux");
var Immutable = require("immutable");
var navigationActions = require("client/actions/navigationActions");
var Router = require("react-router");
var State = Router.State;

var NavigationStore = Reflux.createStore({
  mixins: [State],
  data: Immutable.Map({}),
  listenables: navigationActions,
  getInitialState: function() {
    return this.data;
  },
  setData: function(data) {
    this.data = this.data.merge(data);
  },
  onTransitionEnd: function() {
    this.trigger(this.data);
  },

  // Title handling
  updateDocumentTitle: function () {
    if (typeof document === 'undefined') {
      return;
    }
    document.title = ""; //activeInstance.props.title;
  }
});

module.exports = NavigationStore;
