var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var mui = require("material-ui");
var sessionStore = require("client/stores/session");
var approveTransitionMixin = require("client/mixins/approveTransition");
var authRouteMixin = require("client/mixins/authRoute");
var resourceActions = require("client/actions/resourceActions");
var DocumentTitle = require("react-document-title");

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
      this.setState({contentError: "Content must be at least 10 characters long."});
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
      <DocumentTitle title="New question - React-spa demo">
        <div className="row">
          <div className="large-12 columns">
            <h1>New Question</h1>
            <form onSubmit={this.handleSubmit} onChange={this.clearErrors}>
              <div className="row collapse">
                <mui.TextField
                  ref="title"
                  name="title"
                  type="text"
                  required={true}
                  errorText={this.state.titleError}
                  floatingLabelText="The title of your question" />
                <br/>
                <mui.TextField
                  ref="content"
                  name="content"
                  type="text"
                  required={true}
                  errorText={this.state.contentError}
                  multiLine={true}
                  rows={2}
                  floatingLabelText="The content of your question" />
                <br/>
                <mui.FlatButton type="submit" label="Submit" />
                <Link to="questions">
                  <mui.FlatButton label="Cancel" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </DocumentTitle>
    );
  }
});
module.exports = NewQuestion;
