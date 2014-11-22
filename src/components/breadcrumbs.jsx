var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var mui = require("material-ui");
var Icon = mui.Icon;

var Breadcrumbs = React.createClass({
  render: function() {
    return (
      <ul className="breadcrumbs">

        <li><Icon icon="action-home" /><Link to="/">Home</Link></li>
        <li><a href="#">Features</a></li>
        <li className="unavailable"><a href="#">Gene Splicing</a></li>
        <li className="current"><a href="#">Cloning</a></li>
      </ul>
    );
  }
});

module.exports = Breadcrumbs;
