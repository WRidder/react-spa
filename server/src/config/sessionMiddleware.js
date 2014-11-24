var session = require("express-session");
var MemoryStore = session.MemoryStore;

// TODO: check these settings
var sessionMiddleware = session({
  store: new MemoryStore({ reapInterval:  60000 * 10 }),
  secret: "jsafdliuheflkjhdulhcvabasdfasdfafafadfafaghjfdsgfsfslaeukhvaclhavlkuhfl",
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: new Date(Date.now() + 36000000)},
  maxAge: new Date(Date.now() + 36000000) // 1 hour
});

module.exports = sessionMiddleware;
