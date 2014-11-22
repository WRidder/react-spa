var React = require("react");
var Router = require("react-router");

// Components
var Header = require("./header.jsx");
var Footer = require("./footer.jsx");

var App = React.createClass({
  render: function() {
    return (
      <section>
        <Header/>
        <div className="main">
          <this.props.activeRouteHandler/>
        </div>
        <Footer/>
      </section>
    );
  }
});

module.exports = App;
