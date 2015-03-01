"use strict";
var settings = require("./helpers/settings");

var disableLiveReload = process.argv[2] == "disableLiveReload";
settings.disableLiveReload = disableLiveReload;
console.log("Starting server... disableLiveReload: ", disableLiveReload);

// Init routes
require("./routes/auth");
require("./routes/api");
require("./routes/sockets");
//require("./routes/pushState");
require("./routes/isomorphic");


console.log("Server started");
