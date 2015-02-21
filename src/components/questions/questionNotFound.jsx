"use strict";
var React = require("react");
var Router = require("react-router");
var mui = require("material-ui");
var DocumentTitle = require("client/components/core/documentTitle.jsx");

var Question = React.createClass({
  render: function() {
    return (
      <DocumentTitle title="404: Question not found">
        <div>
            <span>Question not found :(</span>
        </div>
      </DocumentTitle>
    );
  }
});
module.exports = Question;
