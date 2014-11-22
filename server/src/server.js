/**
 * Created by wilbert on 9-11-14.
 */

console.log("Starting server...");

// Init routes
require("./routes/auth");
require("./routes/api");
require("./routes/sockets");


console.log("Server started");
