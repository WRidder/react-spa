var restRouter = require('express').Router();
var server = require("./../config/server");
var rest = require("./../controllers/rest");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// Routes
// Get
restRouter.get('/:type', rest.getAllByType);
restRouter.get('/:type/:type_id', rest.getResourceById);
restRouter.get('/:parent_type/:parent_type_id/:type', rest.getResourcesByParentId);

// Post
restRouter.post('/:type', jsonParser, rest.createResourceByType);

// Put
restRouter.delete('/:type/:type_id', rest.updateResource);

// Delete
restRouter.delete('/:type/:type_id', rest.removeResource);

// Register routes
server.appInstance.use('/api', restRouter);
