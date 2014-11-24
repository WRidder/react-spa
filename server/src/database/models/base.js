var _ = require("lodash");
var accessControl = require("./../helper/accessControl");
var responses = require("./../helper/response");

module.exports = {
  // Access control
  ac: function(priv, callback) {
    if (accessControl.hasPermission(priv)) {
      return callback();
    }
    else {
      return responses["403"];
    }
  },

  // Responses
  resp: function(code, attr) {
    if (!_.has(responses, code)) {
      console.error("Invalid reponse code requested: ", code);
    }
    return _.extend(responses[code], attr);
  }
};
