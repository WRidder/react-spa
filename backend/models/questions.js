var mongoose = require('mongoose'),
    helper = require('../helper');

// Schema:
var questionSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: {type: Number, required: true},
  body: {type: String, required: true}
});
var Question = mongoose.model('Question', questionSchema);

// Validations:
Question.schema.path('title').validate(helper.isNotEmpty, 'title cannot be empty');
Question.schema.path('author').validate(helper.isNotEmpty, 'id cannot be empty');
Question.schema.path('body').validate(helper.isNotEmpty, 'body cannot be empty');

Question.create({
  author: 1,
  title: "The first question",
  body: "body of first question"
}, function (err) {
  if (err) {
    console.log("error while saving question", err);
  }
});

module.exports = Question;
