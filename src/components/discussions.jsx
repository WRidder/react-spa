var React = require("react");
var mui = require("material-ui");
var PaperButton = mui.PaperButton;
var Icon = mui.Icon;
var Checkbox = mui.Checkbox;
var Toggle = mui.Toggle;

var Inbox = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Discussions</h1>
        <span>Some material-ui tests</span>
        <br/>
        <PaperButton type={PaperButton.Types.RAISED} label="Default" />
        <Icon icon="action-home" />
        <this.props.activeRouteHandler/>

        <form>
          <Checkbox name="checkboxName" value="checkboxValue1" />
          <Checkbox name="checkboxName" value="checkboxValue2" />
          <Checkbox name="checkboxName" value="checkboxValue3" />
        </form>
        <Toggle />
      </div>
    );
  }
});

module.exports = Inbox;
