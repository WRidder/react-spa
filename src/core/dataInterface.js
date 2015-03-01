var Q = require("q");
var inDOMEnvironment = typeof window !== 'undefined';
var dataProvider = require("client/core/syncDataProvider");
var devSettings = require("client/helper/devSettings");

var DataInterface = (function() {
  // "private" variables
  var _inDom = inDOMEnvironment;
  var _response = {};
  var _error = false;
  var _profiling = false;
  var _profile = {
    get: [],
    post: []
  };

  // constructor
  function DataInterface(){}

  // Rest methods
  DataInterface.prototype.get = function(path, localOnly) {
    // Check for hydrated data
    var hydratedData = dataProvider.getDataByPath(path);
    if(Object.getOwnPropertyNames(hydratedData).length !== 0 || localOnly){
      _response = hydratedData;

      if (localOnly && !_response) {
        _response = {};
      }
      return this;
    }
    else {
      if (_inDom) {
        var $ = require("jquery");
        // Check if we need artificial server delay for testing
        return Q.when($.get("http://" + window.location.host + path)).delay((devSettings.serverDelay) ? devSettings.serverDelayValue : 0).then(function(result) {
          return result;
        });
      }
      else {
        _response = dataProvider.getDataByPath(path);

        // Profiling
        if (_profiling) {
          _profile.get.push(path);
        }
        return this;
      }
    }
  };

  DataInterface.prototype.post = function(path, data) {
    if (_inDom) {
      var $ = require("jquery");
      return Q.when($.post("http://" + window.location.host + path, data)).then(function(result) {
        return result;
      });
    }
    else {
      var dataProvider = require("client/core/syncDataProvider");
      _response = dataProvider.getDataByPath(path);

      // Profiling
      if (_profiling) {
        _profile.post.push(path);
      }

      return this;
    }
  };

  DataInterface.prototype.loadScript = function(path) {
    if (_inDom) {
      $.cachedScript = function( url, options ) {

        // Allow user to set any option except for dataType, cache, and url
        options = $.extend( options || {}, {
          dataType: "script",
          cache: true,
          url: url
        });

        // Use $.ajax() since it is more flexible than $.getScript
        // Return the jqXHR object so we can chain callbacks
        return $.ajax( options );
      };

      // Retrieve password checker
      return Q.when($.cachedScript("http://" + window.location.host + path));
    }
  };

  // Callbacks
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
  DataInterface.prototype.enableProfiling = function() {
    _profiling = true;
  };

  DataInterface.prototype.disableProfiling = function() {
    _profiling = false;
  };

  DataInterface.prototype.getProfile = function() {
    return _profile;
  };

  return DataInterface;
})();

module.exports = new DataInterface();
