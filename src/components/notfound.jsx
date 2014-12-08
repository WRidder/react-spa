var React = require("react");

var NotFound = React.createClass({
  render: function() {
    return (
      <div>
        <h1>404</h1>
        <span>Path not found.. :(</span>
      </div>
    );
  }
});

module.exports = NotFound;
