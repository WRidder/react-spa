var Reflux = require("reflux");
var Immutable = require("immutable");
var sessionActions = require("client/actions/sessionActions");
var dataInterface = require("client/core/dataInterface");
var $ = require("jquery");

var defaultData = {
  id: -1,
  username: null,
  auth: false,
  roles: ["guest"],
  msg: null,
  returnPath: null
};

var SessionStore = Reflux.createStore({
  init: function() {
    // Check session data locally
    var initialData = {};
    dataInterface.get("/auth/session", true)
    .then(function(data) {
      data.auth = (data.id > -1 && typeof data.username === "string");
      initialData = $.extend({}, defaultData, data);
    });

    // Set data
    this.data = Immutable.Map(initialData);
  },
  listenables: sessionActions,
  getInitialState: function() {
    return this.data;
  },
  setData: function(data) {
    this.data = this.data.merge(data);
  },

  // Login handlers
  onLoginSuccess: function(data) {
    this.setData({
      auth: true,
      id: data.id,
      username: data.username,
      roles: ["auth"]
    });
    this.trigger(this.data);
  },
  onLoginFail: function(msg) {
    this.setData(defaultData);
    this.setData({msg: msg});
    this.trigger(this.data);

    // Clear volatile message
    this.setData({msg: null});
  },
  onLogoutSuccess: function() {
    this.setData(defaultData);
    this.trigger(this.data);
  },

  // Session information
  onSetLoginReturnPath: function(path) {
    this.setData({returnPath: path});
  },

  // API
  isLoggedIn: function() {
    return this.data.get("auth");
  }
});
module.exports = SessionStore;
