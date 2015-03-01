"use strict";
var Resource = require("./../database/models/resource");
var _ = require("lodash");

// TODO: return proper status code and messages
module.exports = {
  // Debug
  session: function(req, res) {
    res.json(req.session);
  },

  // Get
  getAllByType: function(req, res) {
    var result = Resource.getAllResources(req.params.type);
    if (result.status === 200) {
      res.json(result.content);
    }
    else {
      res.sendStatus(404);
    }
  },
  getResourceById: function(req, res) {
    var result = Resource.getResourceById(req.params.type, req.params.typeId);
    if (result.status === 200) {
      res.json(result.content);
    }
    else {
      res.sendStatus(404);
    }
  },
  getResourcesByParentId: function(req, res) {
    var result = Resource.getResourcesByParentId(req.params.parentType, req.params.parentTypeDd, req.params.type);
    if (result.status === 200) {
      res.json(result.content);
    }
    else {
      res.sendStatus(404);
    }
  },

  // Create
  createResourceByType: function(req, res) {
    var result = Resource.createResourceByType(req.params.type, req.body, req.user);

    // Get resource
    var resource = Resource.getResourceById(result.content.type, result.content.id);

    if (resource.status === 200) {
      res.json(resource.content);
    }
    else {
      res.status(404).json(result.reason);
    }
  },

  // Update
  updateResource: function(req, res) {
    var result = Resource.updateResource(req.params.type, req.params.typeId, req.body);
    res.sendStatus(result.status);
  },

  // Remove
  removeResource: function(req, res) {
    var result = Resource.removeResource(req.params.type, req.params.typeId);
    res.sendStatus(result.status);
  }
};
