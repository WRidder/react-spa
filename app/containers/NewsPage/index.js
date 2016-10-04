import React from 'react';
import gyre from "mainGyre";
import NewsListItem from "components/NewsListItem";

export default class NewsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // Initial state
  state = {};

  // Live-cyle methods
  componentWillMount() {
    this.unRegisterListener =
      gyre.addListener("topNewsIds", this.handleNewData);
    gyre.issue("loadNews");
  }
  componentWillUnmount() {
    this.unRegisterListener();
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.children !== this.props.children) {
      return true;
    }
    return (this.state.ids !== nextState.ids);
  }
  handleNewData = (data) => {
    this.setState({
      ids: data
    });
  };

  render() {
    if (this.props.children) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
    return (
      <div>
        <h1>HackerNews: Top Stories</h1>
        <div>
          {
            this.state.ids.map(item => <NewsListItem key={item} newsItemId={item}/>)
          }
        </div>
      </div>
    );
  }
}
