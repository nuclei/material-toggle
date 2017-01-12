'use strict';
/* ---------- */
/* setup */
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
import rollup from 'gulp-rollup-file';
//
gulp.task('default', () => {
    return gulp.src('src/material-toggle.js')
        .pipe(sourcemaps.init())
        .pipe(rollup({ format: 'iife' }))
        // .pipe(babel(
        //     {
        //       "presets": ["latest"],
        //       "plugins": [
        //         ["babel-plugin-transform-builtin-extend", {
        //             "globals": ["Error", "Array", "HTMLElement"]
        //         }]
        //        ]
        //     }
        // ))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});
