var React = require("react");
var mui = require("material-ui");
var MarkdownViewer = require('client/components/markdown/viewer.jsx');
var Spinner = require('react-spinner');

var MaterialUiMarkdownEditor = React.createClass({
  displayName: "MaterialUiMarkdownEditor",
  getDefaultProps: function() {
    return {
      buttonText: "Save",
      onSave: function(value) {},
      onDelete: function() {},
      onCancel: function() {},
      onChange: function(value) {},
      deleteButton: false,
      showSave: true,
      showCancel: false,
      showDelete: false,
      spinner: Spinner,
      spinnerOptions: {
        className: "react-markdown-textarea__spinner"
      }
    }
  },
  getInitialState: function() {
    return {
      active: 'write',
      value: this.props.initialValue || "",
      contentError: ""
    };
  },
  handleContentChange: function() {
    this.setState({value: this.refs.content.getValue()});
  },
  handleSave: function() {
    this.props.onSave(this.state.value);
  },
  handleDelete: function() {
    this.setState({value: ""});
    if (this.refs.content) {
      this.refs.content.setValue("");
    }
    this.props.onDelete();
  },
  handleCancel: function() {
    this.props.onCancel();
  },
  render: function() {
    return (
      <div>
        <mui.Tabs>
          <mui.Tab label="Write" >
            <mui.TextField
              className="max-width"
              ref="content"
              name="content"
              type="text"
              multiLine={true}
              onChange={this.handleContentChange}
              rows={1}
              defaultValue={this.state.value}
              placeHolder="The content of your question" />
            <br/>

          </mui.Tab>
          <mui.Tab label="Preview" >
            <MarkdownViewer value={this.state.value || "No content"} />
          </mui.Tab>
        </mui.Tabs>
        {(this.props.showSave) ? <mui.RaisedButton primary={true} onClick={this.handleSave} label="Save" /> : null}
        {(this.props.showDelete) ? <mui.RaisedButton onClick={this.handleDelete} label="Delete" /> : null}
        {(this.props.showCancel) ? <mui.RaisedButton onClick={this.handleCancel} label="Cancel" /> : null}
      </div>
    );
  }
});
module.exports = MaterialUiMarkdownEditor;
