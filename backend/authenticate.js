var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    User = require('./models/user');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
  secretOrKey: "GJSSecret",
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

// TODO: support option to use basic or token-based strategy
/*module.exports.initialize = function(server) {
    if (! server) {
        console.error('Need to supply server as argument.')
        return null;
    }

    server.use(passport.initialize());

    passport.use(new BasicStrategy(
        function(user_id, password, done) {
            User.findById(user_id, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (! user) {
                    return done(null, false, {message: 'Incorrect user ID.'});
                }
                if (user.password !== password) {
                    return done(null, false, {message: 'Incorrect password.'});
                }
                return done(null, user);
            });
        }
    ));

    return passport;
}*/

module.exports.initialize = function(server) {
  if (! server) {
    console.error('Need to supply server as argument.');
    return null;
  }
  server.use(passport.initialize());

  var strategy = new Strategy(params, function(payload, done) {
    User.findById(payload.id, function(err, user) {
      if (err) {
        return done(err);
      }
      if (! user) {
        return done(null, false, {message: 'Incorrect user ID.'});
      }
      return done(null, {
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user._id,
        id: user._id
      });
    });
  });
  passport.use(strategy);

  return passport;
};