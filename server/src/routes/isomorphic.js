"use strict";
var router = require('express').Router();
var server = require("./../config/server");
var isomorphic = require('./../controllers/isomorphic');

// Routes
router.get("/*", isomorphic.renderApp);

// Register routes
server.appInstance.use("/", router);
