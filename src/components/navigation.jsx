"use strict";
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var $ = require("jquery");

var Navigation = React.createClass({
  componentDidMount: function() {
    $(document).foundation();
  },
  render: function() {
    return (
      <nav className="top-bar" data-topbar role="navigation">
        <ul className="title-area">
          <li className="name">
            <h1><Link to="/">Home</Link></h1>
          </li>
          <li className="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
        </ul>

        <section className="top-bar-section">
          <ul className="left">
            <li className="active"><Link to="questions">Questions</Link></li>
            <li><Link to="discussions">Discussions</Link></li>
            <li><a href="#">Chat</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </section>
      </nav>
    );
  }
});
module.exports = Navigation;
