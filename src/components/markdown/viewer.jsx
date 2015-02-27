var React = require("react");
var $ = require("jquery");
//var marked = require('imports?React=react!marked');
var marked = require("marked");

var markedDefaultOptions = {
  gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    headingOffset: 1
};

var MarkdownViewer = React.createClass({
  displayName: "MarkdownViewer",
  getInitialProps: function() {
    return {
      value: ""
    }
  },
  getInitialState: function() {
    return {
      markedOptions: {}
    }
  },
  render: function() {
    var markedMergedOptions = $.extend({}, markedDefaultOptions, this.props.markedOptions);
    marked.setOptions(markedMergedOptions);

    return (
      <div dangerouslySetInnerHTML={{"__html": marked(this.props.value)}} />
    );
  }
});
module.exports = MarkdownViewer;
