/**
 * Created by Wilbert van de Ridder on 9-11-14.
 */

console.log("Starting server...");

// Init routes
require("./routes/auth");
require("./routes/api");
require("./routes/sockets");
//require("./routes/pushState");
require("./routes/isomorphic");


console.log("Server started");
