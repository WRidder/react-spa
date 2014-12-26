var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var connect= require("client/libraries/tmp_connect");

var sessionActions = require("client/actions/sessionActions");
var sessionStore = require("client/stores/session");
var ImmutableRenderMixin = require("react-immutable-render-mixin");
var LogoutLink = require("./logoutLink.jsx");

var HeaderSession = React.createClass({
  mixins: [connect(sessionStore), ImmutableRenderMixin],
  logoutHandler: function(e) {
    e.preventDefault();
    sessionActions.logout();
  },
  render: function() {
    var content;
    if (this.state.get("auth")) {
      content = (
        <div>
          <Link className="right" to="profile">{this.state.get("username")}</Link><span className="right">Welcome&nbsp;</span><br/>
          <LogoutLink className="right"/>
        </div>
      );
    }
    else {
      content = (
        <div>
          <Link className="right" to="login">Login</Link><br/>
          <Link className="right" to="signup">Sign up</Link>
        </div>
      );
    }
    return content;
  }
});

module.exports = HeaderSession;
