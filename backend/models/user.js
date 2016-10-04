var mongoose = require('mongoose'),
    helper = require('../helper'),
    bcrypt = require("bcrypt-nodejs");

// Schema:
var userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, index: {
        unique: true,
        required: true
    }},
    password: {type: String, required: true},
    role: {type: String, required: true},
    bio: {type: String}
});
var User = mongoose.model('User', userSchema);

// Validations:
User.schema.path('email').validate(function(value) {
    // One or more chars + "@" + 1 or more chars + "." + 1 or more chars + [nothing else]:
    return /.+@.+\..+$/.test(value)
}, 'Invalid email address');

User.schema.path('name').validate(helper.isNotEmpty, 'name cannot be empty');
User.schema.path('password').validate(helper.isNotEmpty, 'password cannot be empty');
User.schema.path('role').validate(helper.isNotEmpty, 'role cannot be empty');

// Default users
User.create({
  name: "admin",
  email: "admin@example.com",
  password: bcrypt.hashSync("admin"),
  role: "admin",
  bio: "I am the admin..."
}, function (err) {
  if (err) {
    console.log("error while saving user", err);
  }
});

User.create({
  name: "henk",
  email: "henk@example.com",
  password: bcrypt.hashSync("henk"),
  role: "basic",
  bio: "I am henk!"
}, function (err) {
  if (err) {
    console.log("error while saving user", err);
  }
});

// Methods:
User.register = function(data, callback, errback) {
    var new_user = new User({
        name: data.name,
        email: data.email,
        password: bcrypt.hashSync(data.password),
        role: "basic",
        bio: ""
    });

    new_user.save(function(err) {
        if (err) {
            return errback();
        }

        return callback(new_user);
    });
};

User.checkAuth = function(email, password, callback, errback) {
    User
      .findOne({"email": email}, function(err, user) {
        if (! user || err || !bcrypt.compareSync(password, user.password)) {
            return errback();
        }

        return callback(user);
    });
};

User.getUser = function(id, callback, errback) {
  User
    .findById(id, function(err, user) {
      if (! user || err) {
        return errback();
      }
      
      callback({
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio
      });      
    });
};

module.exports = User;
