var React = require("react");
var Router = require("react-router");
var classSet = require('react/lib/cx');
var NavigationStore = require("client/stores/navigation");
var State = Router.State;
var Link = Router.Link;
var connect= require("client/libraries/tmp_connect");

var NavigationLink = React.createClass({
  mixins: [State, connect(NavigationStore)],
  propTypes: {
    activeClassName: React.PropTypes.string.isRequired,
    to: React.PropTypes.string.isRequired
  },
  getDefaultProps: function () {
    return {
      activeClassName: "active"
    };
  },
  getClassName: function () {
    var classNames = {};

    if (this.props.className) {
      classNames[this.props.className] = true;
    }
    if (this.isActive(this.props.to, this.props.params, this.props.query)) {

      classNames[this.props.activeClassName] = true;
    }

    return classSet(classNames);
  },
  render: function() {
    return (
      <li className={this.getClassName()}>
        <Link to={this.props.to} activeClassName={this.props.activeClassName}>{this.props.title}</Link>
      </li>
    );
  }
});
module.exports = NavigationLink;

