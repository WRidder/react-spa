var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var NavLink = require("./navLink.jsx");
var connect= require("client/libraries/tmp_connect");
var sessionStore = require("client/stores/session");
var ImmutableRenderMixin = require("react-immutable-render-mixin");
var LogoutLink = require("client/components/user/logoutLink.jsx");

var Navigation = React.createClass({
  mixins: [connect(sessionStore, "session"), ImmutableRenderMixin],
  componentDidMount: function() {
    var $ = require("jquery");
    $(document).foundation();
  },
  render: function() {
    var profileLink = (this.state.session.get("auth")) ? (<NavLink to="/profile" title="Profile" className="profile"/>) : "";
    var loginoutLink = (this.state.session.get("auth")) ? (<li className="logout"><LogoutLink/></li>) : (<NavLink to="/login" title="Login" className="login"/>);

    return (
      <nav className="top-bar" data-topbar role="navigation">
        <ul className="title-area">
          <NavLink to="/" title="Home" className="name"/>
          <li className="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
        </ul>

        <section className="top-bar-section">
          <ul className="left">
            <NavLink to="questions" title="Questions"/>
            <NavLink to="discussions" title="Discussions"/>
            <li><a href="#">Chat</a></li>
            <li><a href="#">About</a></li>
            {profileLink}
            {loginoutLink}
          </ul>
        </section>
      </nav>
    );
  }
});
module.exports = Navigation;
