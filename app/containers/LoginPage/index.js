import React from 'react';
import gyre from "mainGyre";
import TextField from "material-ui/TextField";
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router';

class NewsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // Initial state
  state = {
    loginDisabled: true,
    mailValid: false,
    mailErrorMessage: "Invalid e-mail adress",
    mailValue: '',
    pwValue: '',
    error: false
  };

  // Onclick handlers
  loginClick = () => {
    gyre.issue("logIn", this.refs.email.getValue(), this.refs.pwd.getValue());
  };
  mailChanged = (evt) => {
    const mailValid =/.+@.+\..+$/.test(evt.target.value);

    this.setState({
      error: false,
      loginDisabled: !mailValid || this.state.pwValue.length == 0,
      mailValue: evt.target.value
    });
  };
  pwChanged = (evt) => {
    this.setState({
      error: false,
      loginDisabled: this.state.mailValue == 0 || evt.target.value.length == 0,
      pwValue: evt.target.value
    });
  };
  onKeyDownHandler = (evt) => {
    if (!this.state.loginDisabled && evt.keyCode == 13) {
      this.loginClick();
    }
  };
  setHenkCredentials = () => {
    this.setState({
      mailValue: "henk@example.com",
      pwValue: "henk",
      loginDisabled: false
    })
  };
  setAdminCredentials = () => {
    this.setState({
      mailValue: "admin@example.com",
      pwValue: "admin",
      loginDisabled: false
    })
  };

  // Live-cyle methods
  componentWillMount() {
    this.unRegisterListener =
      gyre.addListener("session", this.handleNewData);
  }
  componentWillUnmount() {
    this.unRegisterListener();
  }
  handleNewData = (data) => {
    const {location, router} = this.props;
    if (data.loggedIn) {
      if (location.state && location.state.nextPathname) {
        router.replace(location.state.nextPathname)
      } else {
        router.replace('/')
      }
    }
    else {
      this.setState({
        error: data.error
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        {(this.state.error) ? (<span>{this.state.error}</span>) : null}
        <div>
          <TextField
            floatingLabelText="E-mail"
            ref="email"
            onChange={this.mailChanged}
            errorText={(this.state.mailValid || !this.state.mailHasValue) ? null : this.state.mailErrorMessage}
            onKeyDown={this.onKeyDownHandler}
            value={this.state.mailValue}
          /><br/>
          <TextField
            floatingLabelText="Password"
            ref="pwd"
            type="password"
            onChange={this.pwChanged}
            onKeyDown={this.onKeyDownHandler}
            value={this.state.pwValue}
          />
          <br/>
          <FlatButton
            label="Login"
            onClick={this.loginClick}
            disabled={this.state.loginDisabled}
            ref="submit"
          />
        </div>
        <div>
          <h3>Preset users:</h3>
          <FlatButton
            label="Henk (User)"
            onClick={this.setHenkCredentials}
            primary={true}
          />
          <FlatButton
            label="Admin (admin)"
            onClick={this.setAdminCredentials}
            secondary={true}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(NewsPage);
