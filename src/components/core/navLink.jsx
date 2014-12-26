var React = require("react");
var Router = require("react-router");
var classSet = require('react/lib/cx');
var Navigation = Router.Navigation;
var State = Router.State;
var Link = Router.Link;

var NavigationLink = React.createClass({
  mixins: [State, Navigation],
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
        <Link to={this.props.to}>{this.props.title}</Link>
      </li>
    );
  }
});
module.exports = NavigationLink;

