var React = require("react");
var Router = require("react-router");

var Footer = React.createClass({
  render: function() {
    return (
      <footer className="footer">
        <div className="row full-width">
          <div className="small-6 medium-6 large-2 columns">
            <h4>Work With Me</h4>
            <ul className="footer-links">
              <li>
                <a href="#">What I Do</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Events</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">FAQ's</a>
              </li>
            </ul>
          </div>
          <div className="small-6 medium-6 large-2 columns">
            <h4>Follow Me</h4>
            <ul className="footer-links">
              <li>
                <a href="#">GitHub</a>
              </li>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">Dribbble</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;
