var React = require("react");
var reflux = require("reflux");
var connect= require("client/libraries/tmp_connect");
var Router = require("react-router");
var Link = Router.Link;
var mui = require("material-ui");

var questionsStore = require("client/stores/questions");
var ImmutableRenderMixin = require("react-immutable-render-mixin");
var componentTransitionMixin = require("client/mixins/componentTransition");
var slugger = require("client/helper/slug");

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
    var userId = this.state.get("user_id");
    var slug = slugger(title);
    return (
      <div className="question">
        <mui.Paper zDepth={1}>
          <div className="inner">
            <Link to="questionWithTitle" params={{questionId: id, questionTitle: slug}}>{title}</Link>
            <br/>
            <span>User: {userId} </span>
          </div>
        </mui.Paper>
      </div>
    );
  }
});

var QuestionList = React.createClass({
  mixins: [connect(questionsStore), ImmutableRenderMixin, componentTransitionMixin("questions")],
  asQuestion: function(item) {
    return (
      <Question content={item} key={item.get("id")}/>
    );
  },
  render: function() {
    var view = this;
    var questions = <mui.Icon className="loading" icon="action-autorenew" />;
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
        <Link to="questionsNew">
          <mui.FlatButton label="Ask new question" />
        </Link>
      </div>
    );
  }
});
module.exports = QuestionList;
