"use strict";
var React = require("react");
var mui = require("material-ui");
var DocumentTitle = require("local/components/core/documentTitle.jsx");

var Discussions = React.createClass({
  render: function() {
    return (
      <DocumentTitle title="Discussions">
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
          <mui.FontIcon className="mdi mdi-home" />

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

module.exports = Discussions;
