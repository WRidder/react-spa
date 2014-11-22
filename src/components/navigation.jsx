var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var NavLink = require("./navLink.jsx"); //Router.Link;
var $ = require("jquery");

var Navigation = React.createClass({
  componentDidMount: function() {
    $(document).foundation();
  },
  render: function() {
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
          </ul>
        </section>
      </nav>
    );
  }
});
module.exports = Navigation;
