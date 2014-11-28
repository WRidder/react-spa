var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

// Components
var Header = require("./header.jsx");
var Footer = require("./footer.jsx");

var App = React.createClass({
  render: function() {
    return (
      <section>
        <Header/>
        <div className="main">
          <RouteHandler />
        </div>
        <Footer/>
      </section>
    );
  }
});

module.exports = App;
