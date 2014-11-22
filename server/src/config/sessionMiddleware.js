/**
 * Created by wilbert on 14-11-14.
 *
 * See: http://stackoverflow.com/questions/25532692/how-to-share-sessions-with-socket-io-1-x-and-express-4-x?rq=1
 */
var session = require("express-session");
var MemoryStore = session.MemoryStore;

// TODO: check these settings
var sessionMiddleware = session({
  store: new MemoryStore({ reapInterval:  60000 * 10 }),
  secret: "jsafdliuheflkjhdulhcvablaeukhvaclhavlkuhfl",
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: new Date(Date.now() + 3600000)},
  maxAge: new Date(Date.now() + 3600000) // 1 hour
});

module.exports = sessionMiddleware;
