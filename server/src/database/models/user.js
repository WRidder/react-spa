var base = require("./base");
var db = require("./../db");
var bcrypt = require('bcrypt-nodejs');
var _ = require("lodash");
var q = require('q');

// Resource model
module.exports = _.extend(base, {
  // Helper functions
  _generateHash: function(password, next) {
    return bcrypt.hash(password, bcrypt.genSaltSync(8), null, next);
  },
  _validPassword: function(password, dbpwd, deferred) {
    bcrypt.compare(password, dbpwd, function(err, res) {
      deferred.resolve(res);
    });
  },

  // Model functions
  getByUsername: function(username) {
    var user = db.users.where({
      "username": username
    });
    if (_.isEmpty(user)) {
      return false;
    }
    return _.first(user);
  },
  validatePassword: function(user, password) {
    var deferred = q.defer();

    // Check if password is valid
    this._validPassword(password, user.get("password"), deferred);

    return deferred.promise;
  },
  /*
   @ resolves: {
      succes: null,
      message: null
     }
   @return promise
   */
  createUser: function(username, password) {
    var deferred = q.defer();

    // Check if user already exists
    if (this.getByUsername(username)) {
      deferred.resolve({
        success: false,
        message: "User already exists"
      });
    }

    // Check if password is strong enough
    // TODO: add proper check, for example using zxcvbn
    else if (password.length < 8) {
      deferred.resolve({
        success: false,
        message: "Password too weak"
      });
    }
    else {
      // Hash password and create user
      this._generateHash(password, function(err, hash) {
        // Create user
        var userId = db.users.createResource({
          username: username,
          password: hash
        });

        if (userId) {
          deferred.resolve({
            success: true,
            message: "User created with id: " + userId,
            model: db.users.get(userId)
          });
        }
        else {
          deferred.resolve({
            success: false,
            message: "Error while creating user"
          });
        }
      });
    }

    return deferred.promise;
  }
});
