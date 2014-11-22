/**
 * Created by wilbert on 15-11-14.
 */

var router = require('express').Router();
var server = require("./../config/server");
var auth = require('./../controllers/auth');

// Routes
router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.get('/login/success', auth.loginSuccess);
router.get('/login/failure', auth.loginFailure);
router.post('/signup', auth.signup);
router.get('/signup/success', auth.signupSuccess);
router.get('/signup/failure', auth.signupFailure);

// Register routes
server.appInstance.use('/auth', router);
