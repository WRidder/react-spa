import React from 'react';
import styles from './styles.css';
import {Link} from "react-router";
import gyre from "mainGyre";

class NewsItemPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // Initial state
  state = null;

  // Live-cyle methods
  componentWillMount() {
    this.unRegisterListener =
      gyre.addListener("newsItems", this.handleNewData);
    gyre.issue("loadNewsItem", this.props.params.id);
  }
  componentWillUnmount() {
    this.unRegisterListener();
  }
  handleNewData = (data) => {
    if (data[this.props.params.id]) {
      this.setState(data[this.props.params.id]);
    }
  };

  render() {
    if (this.state) {
      return (
        <div>
          <h1>{this.state.title}</h1>
          <h2>Comments ({this.state.descendants}): </h2>
        </div>
      )
    }
    return (
      <span>Loading... {this.props.params.id}</span>
    )
  }
}

export default NewsItemPage;
