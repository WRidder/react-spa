var React = require("react");
var DocumentTitle = require("react-document-title");

var NotFound = React.createClass({
  render: function() {
    return (
      <DocumentTitle title="404: Not found - React-spa demo">
        <div>
          <h1>404</h1>
          <span>Path not found.. :(</span>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = NotFound;
