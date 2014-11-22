/**
 * Created by wilbert on 15-11-14.
 */

/**
 * Created by wilbert on 12-11-14.
 */
var restRouter = require('express').Router();
var server = require("./../config/server");
var rest = require("./../controllers/rest");

// Routes
// Debug routers
restRouter.get('/debug/session', rest.session);

// Get
restRouter.get('/:type', rest.getAllByType);
restRouter.get('/:type/:type_id', rest.getResourceById);
restRouter.get('/:parent_type/:parent_type_id/:type', rest.getResourcesByParentId);

// Post
restRouter.post('/:type', rest.createResourceByType);

// Put
restRouter.delete('/:type/:type_id', rest.updateResource);

// Delete
restRouter.delete('/:type/:type_id', rest.removeResource);

// Register routes
server.appInstance.use('/api', restRouter);
