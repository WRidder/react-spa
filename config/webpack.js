'use strict';

var webpack = require('webpack');
var path = require('path');
/**
 * Get configuration for Webpack
 *
 * @see http://webpack.github.io/docs/configuration
 *      https://github.com/petehunt/webpack-howto
 *
 * @param {boolean} release True if configuration is intended to be used in
 * a release mode, false otherwise
 * @return {object} Webpack configuration
 */
module.exports = function(release) {
  return {
    entry: './src/app.js',

    output: {
      filename: 'app.js',
      path: './build/js/',
      publicPath: './build/',

      // Library settings
      library: "reactspa",
      libraryTarget: "umd"
    },

    cache: !release,
    debug: !release,
    devtool: false,

    stats: {
      colors: true,
      reasons: !release
    },

    plugins: release ? [
      new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({ sourceMap: false }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ] : [],

    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
      modulesDirectories: ['node_modules', 'bower_components'],
      alias: {
        client: path.join(__dirname, "../src")
      }
    },



    // more options in the optional jshint object
    jshint: {
      // any jshint option http://www.jshint.com/docs/options/
      // i. e.
      camelcase: true,

      // jshint errors are displayed by default as warnings
      // set emitErrors to true to display them as errors
      emitErrors: true,

      // jshint to not interrupt the compilation
      // if you want any file with jshint errors to fail
      // set failOnHint to true
      failOnHint: true,

      // custom reporter function
/*      reporter: function(errors) {
        //console.log("args: ", arguments);
        this.emitWarning("nooes", this.resourcePath);
        //console.log(errors);
      }*/
    },

    module: {
      preLoaders: [
       {
          test: /\.js$/,
          exclude: /node_modules|bower_components/,
          loader: 'jshint'
        }
      ],

      loaders: [
        {
          test: /\.css$/,
          loader: 'style!css'
        },
        {
          test: /\.less$/,
          loader: 'style!css!less'
        },
        {
          test: /\.gif/,
          loader: 'url-loader?limit=10000&mimetype=image/gif'
        },
        {
          test: /\.jpg/,
          loader: 'url-loader?limit=10000&mimetype=image/jpg'
        },
        {
          test: /\.png/,
          loader: 'url-loader?limit=10000&mimetype=image/png'
        },
        {
          test: /\.jsx?$/,
          loader: 'jsx-loader?harmony'
        },
        {
          test: /\.json/,
          loader: 'json-loader'
        }
      ]
    }
  };
};
