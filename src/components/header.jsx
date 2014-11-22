var React = require("react");
var Router = require("react-router");
var Navigation = require("./navigation.jsx");
var Breadcrumbs = require("./breadcrumbs.jsx");
var Link = Router.Link;

var Header = React.createClass({
  render: function() {
    return (
      <header>
        <div class="row">
          <div class="large-3 columns">
            <Link to="/"><img src="./logo.png" /></Link>
          </div>
          <div class="large-9 columns">
          </div>
        </div>
        <Navigation/>
        <Breadcrumbs/>
      </header>
    );
  }
});

module.exports = Header;
