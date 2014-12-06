module.exports = function(type, data) {
  // Question / id
  if (type == "questions" && data.id) {
    return "/questions/" + data.id;
  }
  return "/";
};
