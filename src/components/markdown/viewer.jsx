var React = require("react");
var $ = require("jquery");
var marked = require("marked");
// TODO: check if we can use SimpleMarkdown. (Probably need custom rules for GFM).
/*

var SimpleMarkdown = require("simple-markdown");
var mdParser = SimpleMarkdown.defaultBlockParse;
var mdOutput = SimpleMarkdown.defaultOutput;
console.log(SimpleMarkdown);
*/

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
 //<div>{mdOutput(mdParser(this.props.value))}</div>
