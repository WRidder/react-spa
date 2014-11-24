var React = require("react");
var reflux = require("reflux");
var connect= require("./../libraries/tmp_connect");

var mui = require("material-ui");
var Icon = mui.Icon;
var PaperButton = mui.PaperButton;

var sessionStore = require("./../stores/session");

var Signup = React.createClass({
  mixins: [connect(sessionStore)],
  render: function() {
    return (
      <div className="row">
        <div className="large-12 columns">
          <div className="signup-panel">
            <h1>Sign up</h1>
            <form>
              <div className="row collapse">
                <div className="small-2  columns">
                  <span className="prefix"><i><Icon icon="social-person" /></i></span>
                </div>
                <div className="small-10 columns">
                  <input type="text" placeholder="Full Name"/>
                </div>
              </div>
              <div className="row collapse">
                <div className="small-2 columns">
                  <span className="prefix"><i><Icon icon="content-mail" /></i></span>
                </div>
                <div className="small-10  columns">
                  <input type="text" placeholder="Email"/>
                </div>
              </div>
              <div className="row collapse">
                <div className="small-2 columns ">
                  <span className="prefix"><i><Icon icon="action-lock" /></i></span>
                </div>
                <div className="small-10 columns ">
                  <input type="text" placeholder="Password"/>
                </div>
              </div>
            </form>
            <PaperButton type={PaperButton.Types.FLAT} label="Sign up" />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Signup;
