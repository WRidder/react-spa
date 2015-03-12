"use strict";
var React = require("react");
var Mui = require("material-ui");
var NavLink = require("./navLink.jsx");
var connect = require("local/libraries/tmp_connect");
var sessionStore = require("local/stores/session");
var ImmutableRenderMixin = require("react-immutable-render-mixin");
var LogoutLink = require("local/components/user/logoutLink.jsx");
var devSettings = require("local/helper/devSettings");


var Navigation = React.createClass({
  mixins: [connect(sessionStore, "session"), ImmutableRenderMixin],
  componentDidMount: function() {
    var $ = require("jquery");
    $(document).foundation();
  },

  // Dev functions
  handleDevSettingsChange: function(evt, key, itemConfig) {
    if (itemConfig.payload === "serverDelay") {
      devSettings.serverDelay = !devSettings.serverDelay;
    }
  },

  render: function() {
    var profileLink = (this.state.session.get("auth")) ? (<NavLink to="/profile" title="Profile" className="profile"/>) : "";
    var loginoutLink = (this.state.session.get("auth")) ? (<li className="logout"><LogoutLink/></li>) : (<NavLink to="/login" title="Login" className="login"/>);

    // Dev settings toolbar
    var iconMenuItems = [
      { text: "DevelopmentSettings"},
      { payload: "serverDelay", text: "Server delay", iconClassName: "mdi mdi-clock", toggle: true, onItemClick: this.toggleServerDelay, defaultToggled: devSettings.serverDelay}
    ];

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
            <NavLink to="about" title="About"/>
            <li><a href="https://github.com/WRidder/react-spa/" target="_blank"><i className="mdi mdi-github-circle"></i> GitHub</a></li>
             {profileLink}
             {loginoutLink}
          </ul>
          <ul className="right">
            <Mui.DropDownIcon closeOnMenuItemClick={false} onChange={this.handleDevSettingsChange} iconClassName="mdi mdi-chevron-down dev-dropdown-icon" menuItems={iconMenuItems} />
          </ul>
        </section>
      </nav>
    );
  }
});
module.exports = Navigation;

/*      */
