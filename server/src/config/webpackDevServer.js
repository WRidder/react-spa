"use strict";
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var path = require("path");
var config = require(path.resolve("../../config/webpack"))(false);
var watch = true;

// Edit paths
config.entry = path.resolve("../../src/app.js")
config.output.path = path.resolve("../../build/js/");
console.log(config);

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  // webpack-dev-server options
  contentBase: "http://localhost:8080",
  // or: contentBase: "http://localhost/",

  hot: false,
  // Enable special support for Hot Module Replacement
  // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
  // Use "webpack/hot/dev-server" as additional module in your entry point

  // webpack-dev-middleware options
  quiet: true,
  noInfo: false,
  lazy: true,
  watchDelay: 300,
  publicPath: "http://localhost:8090/assets/",
  headers: { "X-Custom-Header": "yes" },
  stats: { colors: true }
});

function bundle(err, stats) {
  console.log("Bundler activated");
}

if (watch) {
  compiler.watch(200, bundle);
} else {
  compiler.run(bundle);
}

server.listen(8090, "localhost", function() {});
