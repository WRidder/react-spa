/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import gyre from "mainGyre";

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  buttonClick() {
    gyre.issue("logIn", "henk@example.com", "henk");
    console.log(gyre.value("newsItems"));
  }
  render() {
    return (
      <div>
        <h1>This is the Homepage!</h1>
        <RaisedButton label="Default" onClick={this.buttonClick}/>
      </div>
    );
  }
}
