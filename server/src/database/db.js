"use strict";
var _ = require("lodash");
var data = require("./../data.json");
var ResourceCollection = require("./../collections/resourceCollection");

// Setup collections
// Users
var Users = ResourceCollection.extend({
  sanitizeObject: function(user) {
    return _.pick(user, ["id", "username", "privileges"]);
  },
  createKeys: ["username", "password"],
  validateResourceToCreate: function(content) {
    // Set default privileges
    content.privileges = ["user"];
    return true;
  },
  updateKeys: ["username"]
});
var userCollection = new Users(data.users, {
  type: "users",
  createKeys: ["username", "password"]
});

// Questions
var questionCollection = new ResourceCollection(data.questions, {
  type: "questions",
  createKeys: ["user_id", "title", "content"],
  defaultValuesForResourceToCreate: {
    accepted_answer_id: null
  }
});

// Answers
var answerCollection = new ResourceCollection(data.answers, {
  parentCollection: questionCollection,
  type: "answers",
  createKeys: ["user_id", "parent_id", "content"],
  defaultValuesForResourceToCreate: {
    votes: []
  }
});

// Pages
var pageCollection = new ResourceCollection(data.pages, {
  type: "pages",
  createKeys: ["title", "content"]
});

module.exports = {
  users: userCollection,
  questions: questionCollection,
  answers: answerCollection,
  pages: pageCollection
};
