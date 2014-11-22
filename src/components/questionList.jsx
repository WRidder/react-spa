var React = require("react");
var reflux = require("reflux");
var connect= require("./../libraries/tmp_connect");
var Router = require("react-router");
var Link = Router.Link;
var mui = require("material-ui");
var Icon = mui.Icon;
var Paper = mui.Paper;

var questionsStore = require("./../stores/questions");
var ImmutableRenderMixin = require("react-immutable-render-mixin");
var componentTransitionMixin = require("../mixins/componentTransition");
var slugger = require("helper/slug");

var Question = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ImmutableRenderMixin],
  getInitialState: function() {
    return this.props.content;
  },
  componentWillReceiveProps: function(nextProps) {
    this.replaceState(nextProps.content);
  },
  render: function() {
    var id = this.state.get("id");
    var title = this.state.get("title");
    var slug = slugger(title);
    return (
      <div className="question">
        <Paper zDepth="1">
          <div className="inner">
            <Link to="questionWithTitle" params={{questionId: id, questionTitle: slug}}>{title}</Link>
          </div>
        </Paper>
      </div>
    );
  }
});

var QuestionList = React.createClass({
  mixins: [connect(questionsStore), ImmutableRenderMixin, componentTransitionMixin("questions")],
  asQuestion: function(item) {
    return (
      <Question content={item}/>
    );
  },
  render: function() {
    var view = this;
    var questions = <Icon className="loading" icon="action-autorenew" />;
    if (view.state.size > 0) {
      var questions = [];
      view.state.forEach(function(question) {
        questions.push(view.asQuestion(question));
      });
    }

    return (
      <div className="questions">
        <h1>Questions</h1>
        {questions}
      </div>
    );
  }
});
module.exports = QuestionList;
