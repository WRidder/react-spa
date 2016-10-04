/**
*
* TopNav
*
*/

import React from 'react';
import styles from './styles.css';
import {Link} from "react-router";
import Breadcrumbs from 'react-breadcrumbs';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import gyre from "mainGyre";
var classNames = require('classnames');

class TopNav extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    session: gyre.value("session"),
    responsive: false
  };

  // Helpers
  toggleNav = () => {
    this.setState({
      responsive: !this.state.responsive
    });
  };
  logout = () => {
    gyre.issue("logOut");
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
    this.setState({
      session: data
    })
  };

  render() {
    let Auth;
    if (this.state.session.loggedIn) {
      Auth = (
        <li className={styles.auth}><Link to="/profile">{'\u2698'} User: {this.state.session.user.name}</Link><a href="javascript:void(0);" onClick={this.logout}>(logout)</a></li>
      );
    }
    else {
      Auth = (
        <li className={styles.auth}><Link to="/login">Login</Link></li>
      );
    }

    return (
      <div>
        <div className={styles.header}>
          <Link to="/"><img src={require("assets/logo.png")} /></Link>
        </div>
        <ul className={classNames({
          [styles.topnav]: true,
          [styles.responsive]: this.state.responsive
        })} ref="topNav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/news">News</Link></li>
          <li><Link to="/questions">Questions</Link></li>
          <li><Link to="/chat">Chat</Link></li>
          <li><Link to="/about">About</Link></li>
          {Auth}
          <li className={styles.icon}>
            <a href="javascript:void(0);" onClick={this.toggleNav}>&#9776;</a>
          </li>
        </ul>
        <div className={styles.breadcrumbs}>
          <Breadcrumbs
            routes={this.props.routes}
            params={this.props.params}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TopNav);
