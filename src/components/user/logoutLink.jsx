var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var sessionActions = require("./../../actions/sessionActions");

var LogoutLink = React.createClass({
  logoutHandler: function(e) {
    e.preventDefault();
    sessionActions.logout();
  },
  render: function() {
    return (<a className={this.props.className} href="logout" onClick={this.logoutHandler}>Logout</a>);
  }
});

module.exports = LogoutLink;
