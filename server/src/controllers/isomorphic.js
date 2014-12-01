var _ = require("lodash");
var path = require("path");
var fs = require("fs");
var pathToRegexp = require('path-to-regexp');
var server = require("./../config/server");
var Resource = require("./../database/models/resource");

// Create template
var htmlTemplate = _.template(fs.readFileSync(path.resolve("./../../src/templates/index.tpl")).toString());

// Load library, make sure it's freshly instantiated
var getSpaInstance = function() {
  delete require.cache[require.resolve("./../../../build/js/app")];
  return require("./../../../build/js/app");
};

// Define routes
var routes = [
  // API
  {
    path: '/api/:type',
    handler: function (type) {
      var result = Resource.getAllResources(type);
      if (result.status === 200) {
        return result.content;
      }
      else {
        return {};
      }
    }
  },
  {
    path: '/api/:type/:type_id',
    handler: function (type, type_id) {
      var result = Resource.getResourceById(type, type_id);
      if (result.status === 200) {
        return result.content;
      }
      else {
        return {};
      }
    }
  },
  {
    path: '/api/:parent_type/:parent_type_id/:type',
    handler: function (parent_type, parent_type_id, type) {
      var result = Resource.getResourcesByParentId(parent_type, parent_type_id, type);
      if (result.status === 200) {
        return result.content;
      }
      else {
        return {};
      }
    }
  },
  {
    path: '/auth/session',
    handler: function (type) {
      return {message: "no session found"};
    }
  }
];

// Data caches
var profiles = {};
var reservoir = {};
var getData = function(path) {
  // Match path with handler
  var handler;
  var handlerArgs = [];
  for (var i = 0; i < routes.length; i++) {
    var route = routes[i];
    var keys = [];
    var regex = pathToRegexp(route.path, keys);
    var result = regex.exec(path);

    if (result) {
      // Exec handler
      handler = route.handler;
      handlerArgs = result.slice(1, result.length);
      break;
    }
  }

  if (handler) {
    return route.handler.apply(null, handlerArgs);;
  }
  else {
    return {};
  }
};

// Cache creator
var waterPlant = function(path, callback) {
  // Check if cache is available for this path
  if (_.has(reservoir, path)) {
    // Check if deferred, if so, wait for it to resolve
    if (_.has(reservoir[path], "when")) {
      reservoir[path].when(function(data) {
        callback(data);
      });
    }
    else {
      callback(reservoir[path]);
    }
  }
  else {
    var data = {};

    // Loop get routes
    _.forEach(profiles[path].get, function(val) {
      data[val] = getData(val);
    });
    reservoir[path] = data;

    // Callback with data
    callback(data);
  }
};

var enableHtmlCache = true;
var htmlCache = {};

module.exports = {
  renderApp: function(req, res) {
    try {
      if (enableHtmlCache && _.has(htmlCache, req.path)) {
        console.log("serving from cache..");
        res.send(htmlCache[req.path]);
      }
      else {
        // Check if profile is available for this path
        if (!_.has(profiles, req.path)) {
          // No profile present, do a profile run
          var reactspa = getSpaInstance();
          reactspa.renderToString(req.path, {}, true);
          profiles[req.path] = reactspa.getProfile();
        }

        waterPlant(req.path, function(water) {
          var html = htmlTemplate({content: getSpaInstance().renderToString(req.path, water, true)});
          htmlCache[req.path] = html;
          res.send(html);
        });
      }
    }
    catch(e) {
      console.log("Isomorphic render error: ", e);
    }
  }
};
