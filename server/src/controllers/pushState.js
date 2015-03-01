"use strict";
var path = require('path');

module.exports = {
  push: function(req, res) {
    res.sendFile(path.resolve("../../build/index.html"));
  }
};
