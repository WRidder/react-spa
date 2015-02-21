var React = require("react");
var reflux = require("reflux");
var connect= require("client/libraries/tmp_connect");
var Router = require("react-router");
var Link = Router.Link;
var mui = require("material-ui");
var DocumentTitle = require("client/components/core/documentTitle.jsx");

var questionsStore = require("client/stores/questions");
var ImmutableRenderMixin = require("react-immutable-render-mixin");
var componentTransitionMixin = require("client/mixins/componentTransition");
var dataSortMixin = require("client/mixins/dataSort");
var slugger = require("client/helper/slug");

var Question = React.createClass({
  render: function() {
    var id = this.props.content.get("id");
    var title = this.props.content.get("title");
    var userId = this.props.content.get("user_id");
    var slug = slugger(title);
    return (
      <div className="question">
        <mui.Paper zDepth={1}>
          <div className="inner">
            <Link to="questionWithTitle" params={{questionId: id, questionTitle: slug}}>#{id} {title}</Link>
            <br/>
            <span>User id: {userId} </span>
          </div>
        </mui.Paper>
      </div>
    );
  }
});

var QuestionList = React.createClass({
  mixins: [
    connect(questionsStore, "questions"),
    ImmutableRenderMixin,
    componentTransitionMixin("questions"),
    dataSortMixin
  ],
  getInitialState: function() {
    return {
      sortKey: "title",
      sortDir: "asc"
    };
  },
  asQuestion: function(item) {
    return (
      <Question content={item} key={item.get("id")}/>
    );
  },
  render: function() {
    var view = this;

    // Questions
    var questions = <mui.FontIcon className="loading mdi mdi-reload"/>;
    if (view.state.questions.size > 0) {
      //TODO: The toJS() can be omitted in reactjs >= 0.13
      questions = this.immutableDataSort(view.state.questions, view.state.sortKey, view.state.sortDir).map(function(question) {
        return view.asQuestion(question);
      }).toJS();
    }

    return (
      <DocumentTitle title="Questions">
        <div className="questions">
          <h1>Questions</h1>
          <div className="sort-controls">
            <span>Sort by: </span>
            <mui.FlatButton label={this.getSortLabel("Title", "title")} secondary={this.state.sortKey == "title"} onClick={this.setSort.bind(this, "title")}/>
            <mui.FlatButton label={this.getSortLabel("Id", "id")} secondary={this.state.sortKey == "id"} onClick={this.setSort.bind(this, "id")}/>
            <mui.FlatButton label={this.getSortLabel("User ID", "user_id")} secondary={this.state.sortKey == "user_id"} onClick={this.setSort.bind(this, "user_id")}/>
          </div>
          {questions}
          <Link to="questionsNew">
            <mui.FlatButton label="Ask new question" />
          </Link>
        </div>
      </DocumentTitle>
    );
  }
});
module.exports = QuestionList;
