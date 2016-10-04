/*
    This file is intended only as an example test file, and consists of only a few assertions.

    Generally a different test file should exist for each model in your project's application.

    Read more about mocha at: http://visionmedia.github.io/mocha/
*/

var should = require('should'),
    mongoose = require('mongoose'),
    User = require('../models/user');

mongoose.connect('mongodb://localhost/node-api-boilerplate-test');

describe('User', function() {
    var user_mock = {
        name: 'User Name',
        email: 'user@email.com',
        password: 'hunter2'
    };

    beforeEach(function(done) {
        User.register(
            user_mock,
            // Need wrapping function because this callback is given an argument
            function onSuccess() {
                done();
            },
            done
        );
    });

    afterEach(function(done){
        User.remove({}, function() {
            done();
        });
    });

    describe('#register()', function() {
        it('should not permit users with duplicate emails', function(done) {
            User.register(
                user_mock,
                function onSuccess() {
                    done(Error('Created user with duplicate email'));
                },
                done
            );
        });

        it('should reject invalid emails', function(done) {
            User.register(
                {
                    name: 'User Name',
                    email: 'bademail.com',
                    password: 'hunter2'
                },
                function onSuccess() {
                    done(Error('Create user with invalid email'));
                },
                done
            );
        });
    });
});

