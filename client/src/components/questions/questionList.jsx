"use strict";
var React = require("react");
var connect = require("local/libraries/tmp_connect");
var Router = require("react-router");
var Link = Router.Link;
var mui = require("material-ui");
var DocumentTitle = require("local/components/core/documentTitle.jsx");
var ReactSpinner = require("react-spinner");

var questionsStore = require("local/stores/questions");
var ImmutableRenderMixin = require("react-immutable-render-mixin");
var componentTransitionMixin = require("local/mixins/componentTransition");
var dataSortMixin = require("local/mixins/dataSort");
var slugger = require("local/helper/slug");

var Question = React.createClass({
  render: function() {
    var id = this.props.content.get("id");
    var idText = "#" + id;
    var title = this.props.content.get("title");
    var userId = this.props.content.get("user_id");
    var slug = slugger(title);
    return (
      <div className="question">
        <mui.Paper zDepth={1}>
          <div className="inner">
            <Link to="questionWithTitle" params={{questionId: id, questionTitle: slug}}>{idText} {title}</Link>
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
    Router.Navigation,
    Router.State,
    dataSortMixin
  ],
  getInitialState: function() {
    var sortState = {
      sortKey: "title",
      sortDir: "asc"
    };

    // Get sort state from url query params if available
    var queryParams = this.getQuery();
    if (queryParams.sortKey) {
      sortState.sortKey = queryParams.sortKey;
    }
    if (queryParams.sortDir) {
      sortState.sortDir = queryParams.sortDir;
    }
    return sortState;
  },
  asQuestion: function(item) {
    return (
      <Question content={item} key={item.get("id")}/>
    );
  },
  render: function() {
    var view = this;

    // Questions
    var questions = <ReactSpinner/>;
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
            <Link to="questions" query={{sortKey: "title", sortDir: (view.state.sortKey === "title") ? ((view.state.sortDir === "asc") ? "desc" : "asc") : "asc"}}>
              <mui.FlatButton label={this.getSortLabel("Title", "title")} secondary={this.state.sortKey === "title"} onClick={this.setSort.bind(this, "title")}/>
            </Link>
            <Link to="questions" query={{sortKey: "id", sortDir: (view.state.sortKey === "id") ? ((view.state.sortDir === "asc") ? "desc" : "asc") : "asc"}}>
              <mui.FlatButton label={this.getSortLabel("Id", "id")} secondary={this.state.sortKey === "id"} onClick={this.setSort.bind(this, "id")}/>
            </Link>
            <Link to="questions" query={{sortKey: "user_id", sortDir: (view.state.sortKey === "user_id") ? ((view.state.sortDir === "asc") ? "desc" : "asc") : "asc"}}>
              <mui.FlatButton label={this.getSortLabel("User ID", "user_id")} secondary={this.state.sortKey === "user_id"} onClick={this.setSort.bind(this, "user_id")}/>
            </Link>
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
