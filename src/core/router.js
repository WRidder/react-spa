// router.js
var routes = require('client/routes/routes.jsx');
var React = require('react');
var reactRouter = require('react-router');

module.exports = {
  router: null,
  renderToDom: function() {
    // Create a router
    var router = reactRouter.create({
      routes: routes,
      location: reactRouter.HistoryLocation
    });

    // Run the app
    router.run(function (Handler, state) {
      React.render(React.createElement(Handler), document.body);
    });
    this.router = router;

    return router;
  },
  renderToString: function(path) {
    var content;
    reactRouter.run(routes, path, function(Handler) {
      content = React.renderToString(React.createElement(Handler));
    });
    return content;
  }
};
