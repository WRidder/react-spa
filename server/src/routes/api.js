"use strict";
var restRouter = require('express').Router();
var server = require("./../config/server");
var rest = require("./../controllers/rest");
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: true });

// Routes
// Get
restRouter.get('/:type', rest.getAllByType);
restRouter.get('/:type/:typeId', rest.getResourceById);
restRouter.get('/:parentType/:parentTypeId/:type', rest.getResourcesByParentId);

// Post
restRouter.post('/:type', urlEncodedParser, rest.createResourceByType);

// Put
restRouter.delete('/:type/:typeId', rest.updateResource);

// Delete
restRouter.delete('/:type/:typeId', rest.removeResource);

// Register routes
server.appInstance.use('/api', restRouter);
