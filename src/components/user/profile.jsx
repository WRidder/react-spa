var React = require("react");
var Router = require("react-router");
var connect= require("./../../libraries/tmp_connect");

var sessionStore = require("./../../stores/session");
var ImmutableRenderMixin = require("react-immutable-render-mixin");
var authRouteMixin = require("./../../mixins/authRoute");

var Profile = React.createClass({
  mixins: [ImmutableRenderMixin, authRouteMixin],
  render: function() {
    return (
      <div>
        <h1>Profile: {this.state.session.get("username")}</h1>
        <span>id: {this.state.session.get("id")}</span>
      </div>
    );
  }
});

module.exports = Profile;
