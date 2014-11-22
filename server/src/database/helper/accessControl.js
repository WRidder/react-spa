/**
 * Created by wilbert on 15-11-14.
 */

var accessControlList = {

};

// Get current user by session, check in db for roles, check
var accessControl = {
  hasPermission: function() {
    return true;
  }
};

module.exports = accessControl;
