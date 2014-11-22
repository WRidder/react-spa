var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var mui = require("material-ui");
var Icon = mui.Icon;
var Paper = mui.Paper;
var reflux = require("reflux");
var connect= require("./../libraries/tmp_connect");

var questionStore = require("./../stores/question");
var ImmutableRenderMixin = require("react-immutable-render-mixin");
var componentTransitionMixin = require("../mixins/componentTransition");

var Question = React.createClass({
  mixins: [connect(questionStore), ImmutableRenderMixin, componentTransitionMixin("questions", "questionId")],
  render: function() {
    var view = this;
    var content;
    if (view.state) {
      content = (
          <div className="question">
            <Paper zDepth="1">
              <div className="inner">
                <h1>{view.state.get("title")}</h1>
                <p>{view.state.get("content")}</p>
              </div>
            </Paper>
          </div>
      );
    }
    else {
      content = (<Icon className="loading" icon="action-autorenew" />);
    }
    return (content);
  }
});
module.exports = Question;
