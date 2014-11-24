var React = require("react");
var reflux = require("reflux");
var connect= require("./../libraries/tmp_connect");

var mui = require("material-ui");
var Icon = mui.Icon;
var PaperButton = mui.PaperButton;

var sessionStore = require("./../stores/session");
var sessionActions = require("./../actions/sessionActions");

var Login = React.createClass({
  mixins: [connect(sessionStore, "session")],

  // Helpers
  handerUsernameChange: function(e) {
    this.setState({username: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  handleSubmit: function() {
    if (this.validate()) {
      console.log("username: " + this.state.username);
      console.log("Password: " + this.state.password);
      sessionActions.login(this.state.username, this.state.password);
    }
  },
  validate: function() {
    return this.state.username && this.state.password;
  },

  // Element
  render: function() {
    return (
      <div className="row">
        <div className="large-12 columns">
          <div className="login-panel">
            <h1>Login</h1>
            <form>
              <div className="row collapse">
                <div className="small-2 columns">
                  <span className="prefix"><i><Icon icon="social-person" /></i></span>
                </div>
                <div className="small-10  columns">
                  <input type="text" placeholder="Username" onChange={this.handerUsernameChange}/>
                </div>
              </div>
              <div className="row collapse">
                <div className="small-2 columns ">
                  <span className="prefix"><i><Icon icon="action-lock" /></i></span>
                </div>
                <div className="small-10 columns ">
                  <input type="text" placeholder="Password" onChange={this.handlePasswordChange}/>
                </div>
              </div>
            </form>
            <PaperButton type={PaperButton.Types.FLAT} label="Login" onClick={this.handleSubmit}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Login;
