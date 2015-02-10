var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var mui = require("material-ui");
var Icon = mui.Icon;
var Paper = mui.Paper;
var reflux = require("reflux");
var connect= require("client/libraries/tmp_connect");
var DocumentTitle = require("client/components/core/documentTitle.jsx");

var questionStore = require("client/stores/question");
var ImmutableRenderMixin = require("react-immutable-render-mixin");
var componentTransitionMixin = require("client/mixins/componentTransition");

var Question = React.createClass({
  mixins: [
    connect(questionStore),
    ImmutableRenderMixin,
    componentTransitionMixin("questions", "questionId")
  ],
  render: function() {
    var view = this;
    var title = "Q: " + view.state.get("title");
    var content;
    if (view.state) {
      content = (
        <DocumentTitle title={title}>
          <div className="question">
            <div className="inner">
              <h1>{view.state.get("title")}</h1>
              <p>{view.state.get("content")}</p>
            </div>
          </div>
        </DocumentTitle>
      );
    }
    else {
      content = (<Icon className="loading" icon="action-autorenew" />);
    }
    return (content);
  }
});
module.exports = Question;
