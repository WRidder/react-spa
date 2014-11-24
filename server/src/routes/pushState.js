var router = require('express').Router();
var server = require("./../config/server");
var pushState = require('./../controllers/pushState');

// Routes
var pushStateRoutes = "/questions|discussions|chat|login|logout|signup";
router.get(pushStateRoutes, pushState.push);
router.get(pushStateRoutes + "/", pushState.push);
router.get(pushStateRoutes + "/*", pushState.push);


// Register routes
server.appInstance.use("/", router);
