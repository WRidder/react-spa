var reflux = require("reflux");

// Create actions
var actions = reflux.createActions([
  "transitionStart",
  "transitionEnd"
]);
module.exports = actions;
