var restify,
    fs,
    server;

global.TUNGUS_DB_OPTIONS =  {
  memStore: true
};
require("tungus");
var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');
console.log('Running mongoose version %s', mongoose.version);

function connectToDB(cb) {
    mongoose.connect('tingodb://localdb', function(error){
      if(error) {
        console.log(error);
      }
      else {
        console.log("DB connection successful");
        cb();
      }
    });
}

mongoose.connection.on('error', console.error.bind(console, 'Database connection error:'));
mongoose.connection.on('disconnected', function() {
    connectToDB();
});

restify = require('restify');
restify.defaultResponseHeaders = function(data) {
    this.header('content-type', 'application/json');
};

fs = require('fs');
server = restify.createServer({
    name: 'react-spa-backend'
});
var corsMiddleware = require('restify-cors-middleware');
var cors = corsMiddleware({
  origins: ['http://localhost:3000', 'http://localhost:8000'],
  allowHeaders: ['Authorization']
});

server.use(restify.fullResponse());
server.use(restify.bodyParser());
server.use(restify.authorizationParser());
server.use(cors.actual);
server.pre(cors.preflight);

connectToDB(function() {
  var http = require('http').createServer().listen(4000);
  var io = require('socket.io')(http, { serveClient: false });

  var counter = 0;
  setInterval(() => {
    io.sockets.emit('counter', {
      value: counter++
    });
  }, 1000);

  // Authentication. If you do not need authentication in your API,
  // remove this line and calls to passport.authenticate() in routes.
  var passport = require('./authenticate').initialize(server);

  // Routes:
  var user = require('./routes/user');
  server.post('/register', user.register);
  server.post("/login", user.getToken);

  server.get("/", function(req, res) {
    res.json({status: "My API is alive!"});
  });

  server.get("/testToken",
    passport.authenticate("jwt", {session: false}),
    function(req, res) {
      res.json({
        msg: "ot works!"
      });
    }
  );

  server.get("/checkToken",
    passport.authenticate("jwt", {session: false}),
    user.checkToken
  );

  server.get("/user",
    passport.authenticate("jwt", {session: false}),
    user.getUser
  );
  
  // Question routes
  var questions = restifyMongoose(
    require("./models/questions")
  );

  var transformFunc = function(req, res, next) {
    req.body = {
      author: req.user._id,
      title: req.body.title,
      body: req.body.body
    };
    next();
  };

  // Serve resource notes with fine grained mapping control
  server.get('/questions', questions.query());
  server.get('/questions/:id', questions.detail());
  server.post('/questions',
    passport.authenticate("jwt", {session: false}),
    transformFunc,
    questions.insert()
  );
  server.patch('/questions/:id', 
    passport.authenticate("jwt", {session: false}), 
    transformFunc,
    questions.update()
  );
  server.del('/questions/:id',
    passport.authenticate("jwt", {session: false}),
    transformFunc,
    questions.remove()
  );

  // Handle 404
  server.on('NotFound', function(req, res) {
    res.send(404);
  });

  // Begin listening:
  server.listen(8000, 'localhost', function() {
    console.log('%s listening at %s', server.name, server.url);
  });
});
