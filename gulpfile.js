var gulp = require('gulp');
var sass = require('gulp-sass');
var haml = require('gulp-haml');
var coffee = require('gulp-coffee');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

/* Build SASS to CSS */
gulp.task('sass', function () {
  return gulp.src(['./src/sass/**/*.sass'])
    .pipe(sass())
    .on('error', onError)
    .pipe(gulp.dest('./public/assets/css'))
});

/* Build Coffee to JS */
gulp.task('coffee', function () {
  return gulp.src('./src/coffee/**/*.coffee')
    .pipe(coffee())
    .on('error', onError)
    .pipe(gulp.dest('./public/assets/js'));
});

/* Build HAML to HTML, export to Public folder */
gulp.task('haml', function () {
  return gulp.src('./src/haml/**/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('./public/'));
});

/* Watch changing of each file types to call buid commands */
gulp.task('watch', function () {
  gulp.watch('./src/sass/**/*.sass', ['sass']);
  gulp.watch('./src/coffee/**/*.coffee', ['coffee']);
  gulp.watch('./src/haml/**/*.haml', ['haml']);
});


/** Copy files in 'assets' folder to 'public' folder */
gulp.task('copy-assets', function () {
  gulp.src([
    './src/assets/**/*.*'
  ])
    .pipe(gulp.dest('./public/assets/'))
});

gulp.task('default', ['browser-sync', 'watch'], function () {
  gulp.watch("./public/**/*.*").on('change', browserSync.reload);
});


function onError(err) {
  console.log(err);
  this.emit('end');
}

gulp.task('build', ['copy-assets', 'sass', 'coffee', 'haml']);

gulp.task('browser-sync', ['build'], function () {
  browserSync.init({
    server: {
      baseDir: "./public/",
      // The key is the url to match
      routes: {
        "/bower_components": "bower_components",
        "/node_modules": "node_modules"
      }
    },
    browser: "chrome"
  });
});