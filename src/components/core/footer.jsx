var React = require("react");
var Router = require("react-router");

var Footer = React.createClass({
  render: function() {
    return (
      <footer className="footer">
        <div className="row full-width">
          <div className="small-6 medium-6 large-6 xlarge-6 columns">
            <h4>Column 1</h4>
            <ul className="footer-links">
              <li>
                <a href="#">Some</a>
              </li>
              <li>
                <a href="#">Footer</a>
              </li>
              <li>
                <a href="#">Links</a>
              </li>
              <li>
                <a href="#">Here</a>
              </li>
            </ul>
          </div>
          <div className="small-6 medium-6 large-6 xlarge-6 columns">
            <h4>Column 2</h4>
            <ul className="footer-links">
              <li>
                <a href="#">GitHub</a>
              </li>
              <li>
                <a href="#">Some</a>
              </li>
              <li>
                <a href="#">Other</a>
              </li>
              <li>
                <a href="#">Links</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;
