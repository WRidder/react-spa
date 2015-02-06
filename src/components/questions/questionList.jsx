var React = require("react");
var reflux = require("reflux");
var connect= require("client/libraries/tmp_connect");
var Router = require("react-router");
var Link = Router.Link;
var mui = require("material-ui");
var DocumentTitle = require("react-document-title");

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
  mixins: [connect(questionsStore, "questions"), ImmutableRenderMixin, componentTransitionMixin("questions")],
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
  setSort: function(key) {
    var dir = "asc";
    if (key == this.state.sortKey) {
      dir = (this.state.sortDir == "asc") ? "desc" : "asc";
    }
    this.setState({
      sortKey: key,
      sortDir: dir
    });
  },
  immutableDataSort: function(data, key, dir) {
    return data.sort(function(a,b) {
      var first = (dir == "asc") ? a.get(key) : b.get(key);
      var last = (dir == "asc") ? b.get(key) : a.get(key);

      if (typeof first == "string") {
        return first.localeCompare(last);
      }
      return first - last;
    });
  },
  getSortLabel(title, key) {
    return title += (this.state.sortKey == key) ? ((this.state.sortDir =="asc") ? " ▲" : " ▼") : "";
  },
  render: function() {
    var view = this;

    // Questions
    var questions = <mui.Icon className="loading" icon="action-autorenew" />;
    if (view.state.questions.size > 0) {
      //TODO: The toJS() can be omitted in reactjs >= 0.13
      questions = this.immutableDataSort(view.state.questions, view.state.sortKey, view.state.sortDir).map(function(question) {
        return view.asQuestion(question);
      }).toJS();
    }

    return (
      <DocumentTitle title="Questions - React-spa demo">
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
