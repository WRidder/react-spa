var accessControlList = {

};

// Get current user by session, check in db for roles, check
var accessControl = {
  hasPermission: function() {
    return true;
  }
};

module.exports = accessControl;
