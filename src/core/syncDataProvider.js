var data = {
  "/auth/session": {
    message: "no session found"
  },
  "/api/questions": [{
    "id": 1,
    "user_id": 2,
    "accepted_answer_id": 1,
    "title": "Answer to life and all that?",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin facilisis ligula vitae lectus malesuada, ut scelerisque velit molestie. In eu pulvinar erat, ac porttitor augue."
  }, {
    "id": 2,
    "user_id": 2,
    "accepted_answer_id": null,
    "title": "What do you think of your bike?",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin facilisis ligula vitae lectus malesuada, ut scelerisque velit molestie. In eu pulvinar erat, ac porttitor augue."
  }, {
    "id": 3,
    "user_id": 3,
    "accepted_answer_id": null,
    "title": "Is XKCD real?",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin facilisis ligula vitae lectus malesuada, ut scelerisque velit molestie. In eu pulvinar erat, ac porttitor augue."
  }]
};
var syncDataProvider = {
  getDataByPath: function (path) {
    if (data.hasOwnProperty(path)) {
      return data[path];
    }
    return {};
  }
};

module.exports = syncDataProvider;
