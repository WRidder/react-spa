/*!
 * Facebook React Starter Kit | https://github.com/kriasoft/react-starter-kit
 * Copyright (c) KriaSoft, LLC. All rights reserved. See LICENSE.txt
 */

'use strict';

// Include Gulp and other build automation tools and utilities
// See: https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');
var merge = require('merge-stream');
var runSequence = require('run-sequence');
var webpack = require('webpack');
//var browserSync = require('browser-sync');
var pagespeed = require('psi');
var argv = require('minimist')(process.argv.slice(2));

// Settings
var DEST = './build';                         // The build output folder
var RELEASE = !!argv.release;                 // Minimize and optimize during a build?
var AUTOPREFIXER_BROWSERS = [                 // https://github.com/ai/autoprefixer
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Gulp src wrapper, see: https://gist.github.com/floatdrop/8269868
gulp.plumbedSrc = function () {
  return gulp.src.apply(gulp, Array.prototype.slice.call(arguments))
    .pipe($.plumber());
};

var src = {};
var watch = false;
var pkgs = (function () {
  var pkgs = {};
  var map = function (source) {
    for (var key in source) {
      pkgs[key.replace(/[^a-z0-9]/gi, '')] = source[key].substring(1);
    }
  };
  map(require('./package.json').dependencies);
  return pkgs;
}());

// The default task
gulp.task('default', ['watch']);

// Clean up
gulp.task('clean', del.bind(null, [DEST]));

// Static files
gulp.task('assets', function () {
  src.assets = 'src/assets/**';
  return gulp.src(src.assets)
    .pipe($.changed(DEST))
    .pipe(gulp.dest(DEST))
    .pipe($.size({title: 'assets'}));
});

// Images
/*gulp.task('images', function () {
  src.images = 'src/images*//**';
  return gulp.src(src.images)
    .pipe($.changed(DEST + '/images'))
*//*    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))*//*
    .pipe(gulp.dest(DEST + '/images'))
    .pipe($.size({title: 'images'}));
});*/

gulp.task('libraries', function() {
  var src = [
    "bower_components/jquery/dist/jquery.min.js",
    "bower_components/foundation/js/foundation.min.js",
    "bower_components/modernizr/modernizr.js",
    "bower_components/fastclick/lib/fastclick.js"
  ];
  return gulp.src(src)
    .pipe(gulp.dest("build/js/vendor"));
});

gulp.task('fonts', function() {
  // Move fonts
  gulp.src("bower_components/foundation-icons/foundation_icons_general/fonts/*.*")
    .pipe(gulp.dest("build/fonts"));
});

gulp.task('vendor', ['libraries', 'fonts']);

gulp.task('styles', ['sass-styles', 'mui-styles']);

// CSS style sheets
gulp.task('sass-styles', function () {
  // Add filters for sass and less files
  var sass_filter = $.filter('*.sass');
  var less_filter = $.filter('*.less');
  var material_filter = $.filter(['!material-ui.less']);

  src.styles = [
    "src/styles/style.sass"//,
    //"src/styles/material-ui.less",
    //"src/styles/foundation_icons.less"
  ];//'src/styles/**.{css,less,sass}';
  return gulp.plumbedSrc(src.styles)
    //.pipe($.sourcemaps.init())
    .pipe(sass_filter)
      .pipe($.sass({
        sourceMap: !RELEASE,
        sourceMapBasepath: __dirname
      }))
    .pipe(sass_filter.restore())
    .pipe(less_filter)
    .pipe($.less({
      strictMath: true,
      sourceMap: !RELEASE,
      sourceMapBasepath: __dirname
    }))
    .pipe(less_filter.restore())
    .pipe(material_filter)
      .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      .pipe($.csscomb())
    .pipe(material_filter.restore())
    .pipe($.order(src.styles))
    .pipe($.concat('style.css'))
    .on('error', console.error.bind(console))
    .pipe($.if(RELEASE, $.minifyCss()))

    //.pipe($.sourcemaps.write())
    .pipe(gulp.dest(DEST + '/css'))
    .pipe($.size({title: 'style'}));
});

gulp.task('mui-styles', function () {
  src.styles = [
    "src/styles/material-ui.less"
  ];
  return gulp.plumbedSrc(src.styles)
    .pipe($.less({
      strictMath: true,
      sourceMap: !RELEASE,
      sourceMapBasepath: __dirname
    }))
    .on('error', console.error.bind(console))
    .pipe($.if(RELEASE, $.minifyCss()))
    .pipe(gulp.dest(DEST + '/css'))
    .pipe($.size({title: 'style'}));
});

// Bundle
gulp.task('bundle', function (cb) {
  var started = false;
  var config = require('./config/webpack.js')(RELEASE);
  var bundler = webpack(config);

  function bundle(err, stats) {
    console.log("JS files changed");
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    (true || !!argv.verbose) && $.util.log('[webpack]', stats.toString({colors: true}));
    if (!started) {
      started = true;
      return cb();
    }
  }

  if (watch) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
});

// Build the app from source code
gulp.task('build', ['clean'], function (cb) {
  runSequence(['assets', 'styles', 'bundle', 'vendor'], cb);
});

// Setup live reload
var tinylr;
gulp.task('livereload', function(cb) {
  tinylr = require('tiny-lr')();
  tinylr.listen(35729);
  cb();
});

function notifyLiveReload(fileName) {
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('watch', function (cb) {
  watch = true;

  runSequence('build', 'livereload', function () {
    gulp.watch(src.assets, ['assets']);
    //gulp.watch(src.images, ['images']);
    //gulp.watch(src.index, ['index']);
    gulp.watch(["src/styles/**.*"], ['styles']);
    gulp.watch(DEST + '/**/*.*', function (file) {
      var fileName = path.relative(__dirname, file.path);
      notifyLiveReload(fileName);
    });
    cb();
  });
});

// Deploy to GitHub Pages
gulp.task('deploy', function () {

  // Remove temp folder
  if (argv.clean) {
    var os = require('os');
    var path = require('path');
    var repoPath = path.join(os.tmpdir(), 'tmpRepo');
    $.util.log('Delete ' + $.util.colors.magenta(repoPath));
    del.sync(repoPath, {force: true});
  }

  return gulp.src(DEST + '/**/*')
    .pipe($.if('**/robots.txt', !argv.production ? $.replace('Disallow:', 'Disallow: /') : $.util.noop()))
    .pipe($.ghPages({
      remoteUrl: 'https://github.com/{name}/{name}.github.io.git',
      branch: 'master'
    }));
});

// Run PageSpeed Insights
// Update `url` below to the public URL for your site
gulp.task('pagespeed', pagespeed.bind(null, {
  // By default, we use the PageSpeed Insights
  // free (no API key) tier. You can use a Google
  // Developer API key if you have one. See
  // http://goo.gl/RkN0vE for info key: 'YOUR_API_KEY'
  url: 'https://{name}.github.io',
  strategy: 'mobile'
}));
