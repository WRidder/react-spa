var React = require("react");
var Router = require("react-router");
var mui = require("material-ui");
var DocumentTitle = require("react-document-title");

var Inbox = React.createClass({
  render: function() {
    return (
      <DocumentTitle title="Discussions - React-spa demo">
        <div>
          <h1>Discussions</h1>
          <span>Some material-ui tests</span>
          <br/>
          <mui.DatePicker
            name="PortraitDialogDate"
            placeholder="Pick a date"
            inlinePlaceholder={true} />
          <br/>
          <mui.FlatButton label="Default" />
          <mui.Icon icon="action-home" />

          <form>
            <mui.Checkbox name="checkboxName" value="checkboxValue1" />
            <mui.Checkbox name="checkboxName" value="checkboxValue2" />
            <mui.Checkbox name="checkboxName" value="checkboxValue3" />
          </form>
          <mui.Toggle />

        </div>
      </DocumentTitle>
    );
  }
});

module.exports = Inbox;
