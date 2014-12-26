var React = require("react");
var Router = require("react-router");
var mui = require("material-ui");
var sessionStore = require("./../../stores/session");
var approveTransitionMixin = require("../../mixins/approveTransition");
var authRouteMixin = require("./../../mixins/authRoute");
var resourceActions = require("./../../actions/resourceActions");

var NewQuestion = React.createClass({
  mixins: [authRouteMixin, approveTransitionMixin],
  getInitialState: function() {
    return {
      titleError: null,
      contentError: null,
      saved: false
    };
  },

  // Helpers
  handleSubmit: function(evt) {
    evt.preventDefault();
    var title = this.refs.title.getValue();
    var content = this.refs.content.getValue();

    if (this.validate(title, content)) {
      resourceActions.createResource("questions", {
        title: title,
        content: content
      }, true);
      this.setState({saved: true});
    }
  },
  validate: function(title, content) {
    // Check title
    if (!title || title.length < 10) {
      this.setState({titleError: "Title must be at least 10 characters long."});
      title = false;
    }
    else {
      this.setState({titleError: null});
    }

    // Check content
    if (!content || content.length < 10) {
      this.setState({contentError: "Title must be at least 10 characters long."});
      content = false;
    }
    else {
      this.setState({contentError: null});
    }
    return title && content;
  },
  clearErrors: function() {
    this.setState({titleError: null});
    this.setState({contentError: null});
  },
  mayTransition: function() {
    var title = this.refs.title.getValue() || false;
    var content = this.refs.content.getValue() || false;

    return this.state.saved || (!title && !content);
  },

  // Element
  render: function() {
    return (
      <div className="row">
        <div className="large-12 columns">
          <h1>New Question</h1>
          <form onSubmit={this.handleSubmit} onChange={this.clearErrors}>
            <div className="row collapse">
              <mui.Input ref="title" type="text" required={true} name="title" placeholder="Title" description="The title of your question." error={this.state.titleError}/>
              <mui.Input multiline={false} ref="content" type="text" required={true} name="content" placeholder="Content" description="The content of your question." error={this.state.bodyError}/>
              <mui.FlatButton type="submit" label="Submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
});
module.exports = NewQuestion;
