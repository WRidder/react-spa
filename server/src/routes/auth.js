"use strict";
var router = require('express').Router();
var server = require("./../config/server");
var auth = require('./../controllers/auth');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Routes
router.post('/login', urlencodedParser, auth.login);
router.post('/logout', auth.logout);
router.post('/signup', urlencodedParser, auth.signup);
router.get('/session', auth.checkSession);

// Register routes
server.appInstance.use('/auth', router);
