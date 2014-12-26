var React = require("react");
var reflux = require("reflux");
var connect= require("./../../libraries/tmp_connect");

var mui = require("material-ui");
var Icon = mui.Icon;

var sessionStore = require("./../../stores/session");
var sessionActions = require("./../../actions/sessionActions");

var Login = React.createClass({
  mixins: [connect(sessionStore, "session")],

  // Transition
  statics: {
    willTransitionTo: function (transition, params) {
      if (sessionStore.isLoggedIn()) {
        transition.redirect("profile");
      }
    }
  },

  componentWillUpdate: function() {
    var router = require("./../../core/router").router;
    if (sessionStore.isLoggedIn()) {
      router.transitionTo("profile");
    }
  },

  // Helpers
  handleSubmit: function(evt) {
    evt.preventDefault();
    var username = this.refs.username.getValue();
    var password = this.refs.password.getValue();

    if (this.validate(username, password)) {
      sessionActions.login(username, password);
    }
  },
  validate: function(username, password) {
    // Check title
    if (!username) {
      this.setState({usernameError: "Username cannot be empty!"});
      username = false;
    }
    else {
      this.setState({usernameError: null});
    }

    // Check content
    if (!password) {
      this.setState({passwordError: "Password cannot be empty!"});
      password = false;
    }
    else {
      this.setState({passwordError: null});
    }
    return username && password;
  },
  clearErrors: function() {
    this.setState({usernameError: null});
    this.setState({passwordError: null});
  },

  // Element
  render: function() {
    // Show message if available
    var msg;
    if (this.state.session.get("msg")) {
      msg = (
        <div data-alert className="alert-box alert">
          {this.state.session.get("msg")}
          <a href="#" className="close">&times;</a>
        </div>
      );
    }
    else {
      msg = null;
    }

    return (
      <div className="row">
        <div className="large-12 columns">
          <h1>Login</h1>
          {msg}
          <form onSubmit={this.handleSubmit} onChange={this.clearErrors}>
            <div className="row collapse">
              <mui.Input ref="username" type="text" required={true} name="username" placeholder="Username" description="Your username" error={this.state.usernameError}/>
              <mui.Input multiline={false} ref="password" type="text" required={true} name="Password" placeholder="Password" description="Your password" error={this.state.passwordError}/>
              <mui.FlatButton type="submit" label="Submit" />
            </div>
          </form>
          <br/>
          <span>Accounts: (Admin/Admin), (Katy/Katy), (James/James)</span><br/>
        </div>
      </div>
    );
  }
});

module.exports = Login;
