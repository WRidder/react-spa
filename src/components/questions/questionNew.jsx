"use strict";
var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var mui = require("material-ui");

var MarkdownEditor = require("client/components/markdown/editor.jsx");
var approveTransitionMixin = require("client/mixins/approveTransition");
var authRouteMixin = require("client/mixins/authRoute");
var resourceActions = require("client/actions/resourceActions");
var DocumentTitle = require("client/components/core/documentTitle.jsx");

var NewQuestion = React.createClass({
  mixins: [authRouteMixin, approveTransitionMixin],
  getInitialState: function() {
    return {
      titleError: null,
      saved: false,
      saving: false
    };
  },

  // Helpers
/*  handleSubmit: function(evt) {
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
  },*/
  handleSave: function(value) {
    this.setState({saving: true});
    var title = this.refs.title.getValue();

    if (this.validate(title)) {
      resourceActions.createResource("questions", {
        title: title,
        content: value
      }, true);
      this.setState({saved: true, saving: false});
    }
    else {
      this.setState({saving: false});
    }
  },
  validate: function(title) {
    // Check title
    if (!title || title.length < 10) {
      this.setState({titleError: "Title must be at least 10 characters long."});
      title = false;
    }
    else {
      this.setState({titleError: null});
    }
    return !!title;
  },
  clearErrors: function() {
    this.setState({titleError: null});
  },
  mayTransition: function() {
    var title = this.refs.title.getValue() || false;

    return this.state.saved || !title;
  },

  // Element
  render: function() {
    return (
      <DocumentTitle title="New question">
        <div className="row">
          <div className="large-12 columns">
            <h1>New Question</h1>
              <div className="row collapse">
                <mui.TextField
                  ref="title"
                  name="title"
                  type="text"
                  errorText={this.state.titleError}
                  floatingLabelText="The title of your question" />
                <br/><br/>
                <MarkdownEditor
                  ref="content"
                  saving={this.state.saving}
                  onSave={this.handleSave}
                  floatingLabelText="Write a new question"
                  showDelete={true}
                />
                <Link to="questions">
                  <mui.FlatButton label="Cancel" />
                </Link>
              </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
});
module.exports = NewQuestion;
