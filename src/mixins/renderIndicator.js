var $ = require("jquery");

var dbClassName = "db-element-update";

var renderIndicator = {
  componentDidMount: function() {
    console.log("yeah");
    $(this.getDOMNode()).removeClass(dbClassName).addClass(dbClassName);
  },
  componentWillUpdate: function() {
    $(this.getDOMNode()).removeClass(dbClassName).addClass(dbClassName);
  },
  componentWillUnmount: function() {
    console.log("removing..", $(this.getDOMNode()));
    $(this.getDOMNode()).removeClass(dbClassName);
  }
};

module.exports = renderIndicator;
