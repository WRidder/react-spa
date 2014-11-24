var base = require("./base");
var db = require("./../db");
var _ = require("lodash");

// Resource model
module.exports = _.extend(base, {
  // Get operations
  getAllResources: function(type) {
    return this.ac("getAllResources", function() {
      // Check if type exists
      if (_.has(db, type)) {
        return this.resp("200", {
          content: db[type].getAll()
        });
      }
      return this.resp("404", {
        reason: "Type does not exist"
      });
    }.bind(this));
  },
  getResourceById: function(type, id) {
    return this.ac("getResourceById", function() {
      // Check if type exists
      if (_.has(db, type) && db[type].getById(parseInt(id))) {
        return this.resp("200", {
          content: db[type].getById(parseInt(id))
        });
      }
      return this.resp("404", {
        reason: "Resource does not exist"
      });
    }.bind(this));
  },
  getResourcesByParentId: function(parentType, parentId, type) {
    return this.ac("getResourcesByParentId", function() {
      // Check if type exists
      if (_.has(db, type, parentType) && db[type].getByParentId(parseInt(parentId), parentType)) {
        return this.resp("200", {
          content: db[type].getByParentId(parseInt(parentId), parentType)
        });
      }
      return this.resp("404", {
        reason: "Resource does not exist"
      });
    }.bind(this))
  },

  // Post (create) operations
  createResourceByType: function(type, content) {
    return this.ac("createResourceByType", function() {
      if (_.has(db, type)) {
        var id = db[type].createResource(content);
        if (id) {
          return this.resp("201", {
            content: {
              id: id
            }
          });
        }
        else {
          return this.resp("404", {
            reason: "Invalid content"
          });
        }
      }
      return this.resp("404", {
        reason: "Type does not exist"
      });
    }.bind(this));
  },

  // Update operations
  updateResource: function(type, id, content) {
    return this.ac("updateResource", function() {
      if (_.has(db, type)) {
        if (db[type].updateResource(id, content)) {
          return this.resp("201");
        }
        return this.resp("404", {
          reason: "Invalid content"
        });
      }
      return this.resp("404", {
        reason: "Type does not exist"
      });
    }.bind(this));
  },

  // Remove operations
  removeResource: function(type, id) {
    return this.ac("removeResource", function() {
      if (_.has(db, type)) {
        if (db[type].removeResource(id)) {
          return this.resp("200");
        }
        else {
          return this.resp("404", {
            reason: "Resource not found"
          });
        }
      }
      return this.resp("404", {
        reason: "Type does not exist"
      });
    }.bind(this));
  }
});
