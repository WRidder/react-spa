var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var DocumentTitle = require("react-document-title");

// Components
var Header = require("./core/header.jsx");
var Footer = require("./core/footer.jsx");

var App = React.createClass({
  render: function() {
    return (
      <section className="app-container">
        <Header/>
        <div className="main">
          <DocumentTitle title='React-spa demo'>
            <RouteHandler />
          </DocumentTitle>
        </div>
        <Footer/>
      </section>
    );
  }
});

module.exports = App;
