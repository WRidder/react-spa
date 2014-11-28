var Reflux = require("reflux");
var Immutable = require("immutable");
var sessionActions = require("./../actions/sessionActions");

var defaultData = {
  id: -1,
  username: null,
  auth: false,
  roles: ["guest"],
  msg: null
};

var SessionStore = Reflux.createStore({
  listenables: sessionActions,
  data: Immutable.Map(defaultData),
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
  onLoginFail: function(data) {
    this.setData(defaultData);
    this.setData({msg: data.message});
    this.trigger(this.data);
  },
  onLogoutSuccess: function() {
    this.setData(defaultData);
    this.trigger(this.data);
  },

  // API
  isLoggedIn: function() {
    return this.data.get("auth");
  }
});
module.exports = SessionStore;
