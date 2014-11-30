var data = {};
var syncDataProvider = {
  hydrate: function(water) {
    data = water;
  },
  getDataByPath: function (path) {
    if (data.hasOwnProperty(path)) {
      return data[path];
    }
    return {};
  }
};

module.exports = syncDataProvider;
