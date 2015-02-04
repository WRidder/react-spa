var React = require("react");
var DocumentTitle = require("react-document-title");

var Inbox = React.createClass({
  render: function() {
    return (
      <DocumentTitle title="Home - React-spa demo">
        <div>
          <h1>Home</h1>
          <p>This is a live demonstration site for the react-spa application build automatically from the latest version. You can login using the credentials provided on the login page</p>
          <p>If you encounter any problems, have suggestions or ideas, please head over to the GitHub page!</p>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = Inbox;
