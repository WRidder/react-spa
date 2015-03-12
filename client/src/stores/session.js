"use strict";
var Reflux = require("reflux");
var Immutable = require("immutable");
var sessionActions = require("local/actions/sessionActions");
var dataInterface = require("local/core/dataInterface");
var aug = require("aug");

var defaultData = {
  id: -1,
  username: null,
  auth: false,
  roles: ["guest"],
  msg: null,
  returnPath: null,
  pwdCheckState: null
};

var SessionStore = Reflux.createStore({
  init: function() {
    // Check session data locally
    var initialData = {};
    dataInterface.get("/auth/session", true)
    .then(function(data) {
      data.auth = (data.id > -1 && typeof data.username === "string");
      initialData = aug({}, defaultData, data);
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

  // Password checker
  onLoadPasswordChecker: function() {
    this.setData({pwdCheckerState: "loading"});
    this.trigger(this.data);
  },
  onLoadPasswordCheckerSuccess: function() {
    this.setData({pwdCheckerState: "ready"});
    this.trigger(this.data);
  },
  onLoadPasswordCheckerFailed: function() {
    this.setData({pwdCheckerState: "failed"});
    this.trigger(this.data);
  },

  // API
  isLoggedIn: function() {
    return this.data.get("auth");
  }
});
module.exports = SessionStore;
