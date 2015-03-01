"use strict";
var Backbone = require("backbone");
var _ = require("lodash");

module.exports = Backbone.Collection.extend({
  initialize: function(data, options) {
    if (options) {
      if (options.parentCollection) {
        this._parentCollection = options.parentCollection;
      }

      if (options.type) {
        this._type = options.type;
      }
      else {
        throw new Error("Type should be provided when creating a resource collection");
      }

      if (options.defaultValuesForResourceToCreate) {
        this.defaultValuesForResourceToCreate = options.defaultValuesForResourceToCreate;
      }

      if (options.createKeys) {
        this.createKeys = options.createKeys;
      }
    }
    _.defer(_.bind(this._initMaxId, this));
  },
  _maxId: 0,
  _initMaxId: function() {
    this._maxId = this.max(function(resource) {
      return parseInt(resource.id);
    }).get("id");
  },
  _getMaxId: function() {
    return ++this._maxId;
  },
  _sanitize: function(resource) {
    if (resource) {
      // Array of obj
      if (_.isArray(resource)) {
        return _.map(resource, function(singleResource) {
          return this.sanitizeObject(singleResource);
        }.bind(this));
      }
      // Single obj
      else {
        return this.sanitizeObject(resource);
      }
    }
    else {
      return false;
    }
  },
  _parentCollection: null,
  _type: "",

  // Helper functions
  sanitizeObject: function(resource) {
    return resource;
  },

  // Get
  getAll: function() {
    return this._sanitize(this.toJSON());
  },
  getById: function(id) {
    var resource = this.get(id);
    if (!resource) {
      return resource;
    }
    return this._sanitize(resource.toJSON());
  },
  getByParentId: function(parentId, parentType) {
    if (this._parentCollection) {
      if (this._parentCollection._type == parentType && this._parentCollection.get(parentId)) {
        var resources = this.where({
          "parent_id": parentId
        });
        if (!resources) {
          return false;
        }
        return _.map(resources, function(resource) {
          return this._sanitize(resource.toJSON());
        }.bind(this));
      }
      return false;
    }
    return false;
  },

  // Create
  createKeys: [],
  validateResourceToCreate: function(content) {
    return true;
  },
  defaultValuesForResourceToCreate: {},
  createResource: function(content) {
    if (this.validateResourceToCreate(content) && _.intersection(_.keys(content), this.createKeys).length == this.createKeys.length) {
      // Create resource
      var resource = _.extend(_.pick(content, this.createKeys), {
        id: this._getMaxId()
      }, this.defaultValuesForResourceToCreate);
      this.add(resource);

      // Return resource id
      return resource.id;
    }
    else {
      return false;
    }
  },

  // Update
  updateKeys: [],
  updateResource: function(id, content) {
    // Get resource and update (sanitized) content
    this.get(id).set(_.pick(content, this.updateKeys));
    return true;
  },

  // Remove
  removeResource: function(id) {
    if (this.get(id)) {
      this.remove(id);
      return true;
    }
    return false;
  }
});
