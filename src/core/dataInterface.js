var Q = require("q");
var inDOMEnvironment = typeof window !== 'undefined';

var DataInterface = (function() {
  // "private" variables
  var _inDom = inDOMEnvironment;
  var _response = {};
  var _error = false;
  var _profiling = false;
  var _profile = {
    get: {},
    post: {}
  };

  // constructor
  function DataInterface(){}

  // Rest methods
  DataInterface.prototype.get = function(path) {
    if (_inDom) {
      var $ = require("jquery");
      return Q.when($.get("http://" + window.location.host + path)).then(function(result) {
        console.log("di(dom) get (" + path + "): ", result);
        return result;
      });
    }
    else {
      console.log("di(node) get: ", path);
      var dataProvider = require("./../core/syncDataProvider");
      _response = dataProvider.getDataByPath(path);

      // Profiling
      if (_profiling) {
        _profile.get[path] = _response;
      }

      return this;
    }
  };

  DataInterface.prototype.post = function(path, data) {
    if (_inDom) {
      var $ = require("jquery");
      return Q.when($.post("http://" + window.location.host + path, data)).then(function(result) {
        console.log("di(dom) post (" + path + "): ", result);
        return result;
      });
    }
    else {
      console.log("di(node) post: ", path, data);
      var dataProvider = require("./../core/syncDataProvider");
      _response = dataProvider.getDataByPath(path);

      // Profiling
      if (_profiling) {
        _profile.post[path] = _response;
      }

      return this;
    }
  };

  // Callbakcs
  DataInterface.prototype.then = function(callback) {
    if (!_error) {
      callback(_response);
    }
    return this;
  };

  DataInterface.prototype.catch = function(callback) {
    if (_error) {
      callback(null, "", "");
    }
    return this;
  };

  // Helper methods
  DataInterface.prototype.enableProfiling = function(enable) {
    _profiling = true;
  };

  DataInterface.prototype.disableProfiling = function(enable) {
    _profiling = false;
  };

  DataInterface.prototype.getProfile = function() {
    return _profile;
  };

  return DataInterface;
})();

module.exports = new DataInterface();
