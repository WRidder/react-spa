"use strict";
var _ = require("lodash");
var path = require("path");
var fs = require("fs");
var pathToRegexp = require('path-to-regexp');
var server = require("./../config/server");
var Resource = require("./../database/models/resource");
require("./../helpers/uncache")(require);

// Create template
var htmlTemplate = _.template(fs.readFileSync(path.resolve("./../src/templates/index.tpl")).toString());

// Load library, make sure it's freshly instantiated
var getSpaInstance = function() {
  require.uncache("./../../../build/js/app");
  return new require("./../../../build/js/app");
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
    handler: function (type, typeId) {
      var result = Resource.getResourceById(type, typeId);
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
    handler: function (parentType, parentTypeId, type) {
      var result = Resource.getResourcesByParentId(parentType, parentTypeId, type);
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
    handler: function (req) {
      if (req.isAuthenticated()) {
        return req.user;
      }
      else {
        return {
          message: "no session found"
        };
      }
    }
  }
];

// Data caches
var profiles = {};
var reservoir = {};
var getData = function(path, req) {
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
  // Add request object
  handlerArgs.push(req);

  if (handler) {
    return handler.apply(null, handlerArgs);

  }
  else {
    return {};
  }
};

// Cache creator
var waterPlant = function(path, callback, req, preventCache) {
  // Check if cache is available for this path
  if (_.has(reservoir, path) && !preventCache) {
    callback(reservoir[path]);
  }
  else {
    var data = {};

    // Loop get routes
    _.forEach(profiles[path].get, function(val) {
      data[val] = getData(val, req);
    });
    if (!preventCache) {
      reservoir[path] = data;
    }

    // Callback with data
    callback(data);
  }
};

var enableHtmlCache = false;
var enableIsomorphicApp = false;
var htmlCache = {};

module.exports = {
  renderApp: function(req, res) {
    var authenticated = req.isAuthenticated();
    try {
      if (enableHtmlCache && _.has(htmlCache, req.path) && !authenticated) {
        console.log("Cache hit!");
        res.send(htmlCache[req.path]);
      }
      else if (!enableIsomorphicApp) {
        var water = null;
        if (req.isAuthenticated()) {
          water = {
            "/auth/session": req.user
          };
        }

        var html = htmlTemplate({
          documentTitle: "React-spa demo",
          content: null,
          water: (water) ? JSON.stringify(water) : null
        });
        res.send(html);
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
          var renderResults = getSpaInstance().renderToString(req.path, water, true);
          var html = htmlTemplate({
            documentTitle: renderResults.title || "React-spa demo",
            content: renderResults.body,
            water: JSON.stringify(water)
          });
          if (!authenticated) {
            htmlCache[req.path] = html;
          }
          res.send(html);
        }, req, authenticated);
      }
    }
    catch(e) {
      console.log("Isomorphic render error: ", e);
      console.log(e.stack);
    }
  }
};
