// router.js
var routes = require('./../routes/routes');
var React = require('react');
var reactRouter = require('react-router');

// we can create a router before "running" it
var router = reactRouter.create({
  routes: routes,
  location: reactRouter.HistoryLocation
});

// Run the app
router.run(function (Handler, state) {
  React.render(<Handler/>, document.body);
});

module.exports = router;
