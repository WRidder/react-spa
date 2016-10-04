import React from 'react';
import styles from './styles.css';
import {Link} from "react-router";
import gyre from "mainGyre";

class NewsListItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // Initial state
  state = null;

  // Live-cyle methods
  componentWillMount() {
    this.unRegisterListener =
      gyre.addListener("newsItems", this.handleNewData);
    gyre.issue("loadNewsItem", this.props.newsItemId);
  }
  componentWillUnmount() {
    this.unRegisterListener();
  }
  handleNewData = (data) => {
    if (data[this.props.newsItemId]) {
      this.setState(data[this.props.newsItemId]);
    }
  };

  render() {
    if (this.state) {
      return (
        <div>
          <Link to={`/news/${this.props.newsItemId}`}>{this.state.title + ` (${this.state.descendants})`}</Link>
        </div>
      );
    }
    else {
      return (
        <div>Loading.. {this.props.newsItemId}</div>
      )
    }
  }
}

export default NewsListItem;
