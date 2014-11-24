var path = require('path');
var passport = require("passport");

module.exports = {
  push: function(req, res) {
    res.sendFile(path.resolve("../../build/index.html"));
  }
};
