var React = require("react");
var Router = require("react-router");
var connect= require("./../libraries/tmp_connect");

var sessionStore = require("./../stores/session");
var ImmutableRenderMixin = require("react-immutable-render-mixin");

var Profile = React.createClass({
  mixins: [connect(sessionStore), ImmutableRenderMixin],
  render: function() {
    return (
      <div>
        <h1>Profile: {this.state.get("username")}</h1>
        <span>id: {this.state.get("id")}</span>
      </div>
    );
  }
});

module.exports = Profile;
