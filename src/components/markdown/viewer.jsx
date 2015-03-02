"use strict";
var React = require("react");
var Markdown = require("../markdown/custom-md.jsx");
var mdParser = Markdown.parse;
var mdOutput = Markdown.output;

var MarkdownViewer = React.createClass({
  displayName: "MarkdownViewer",
  getInitialProps: function() {
    return {
      value: ""
    };
  },
  render: function() {
    return (
      <div>{mdOutput(mdParser(this.props.value))}</div>
    );
  }
});
module.exports = MarkdownViewer;
