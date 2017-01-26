'use strict'
/* ---------- */
/* setup */
var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
//
gulp.task('default', function () {
  return gulp.src('src/material-toggle.js')
      .pipe(sourcemaps.init())
      .pipe(gulp.dest('docs'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist'))
})
