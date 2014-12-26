"use strict";
var React = require("react");
var Router = require("react-router");
var mui = require("material-ui");
var Icon = mui.Icon;
var Toggle = mui.Toggle;

var Question = React.createClass({
  render: function() {
    return (
      <div>
          <span>Question not found :(</span>
      </div>
    );
  }
});
module.exports = Question;
