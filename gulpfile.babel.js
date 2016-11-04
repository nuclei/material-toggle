// var babel = require('rollup-plugin-babel');
// // var rollup = require('rollup-stream');
// // var rollup = require('rollup');
// import { rollup } from 'rollup';
// var source = require('vinyl-source-stream');
// // var buffer = require('vinyl-buffer');
// import gulp from 'gulp';
// // import { rollup } from 'rollup';
// import rollup from 'rollup-stream'
// import babel from 'rollup-plugin-babel';
//
// gulp.task('build', function() {
//   return rollup({
//     entry: 'src/material-toggle.js',
//     plugins: [
//       babel({
//         presets: [
//           [
//             "es2015", {
//               "modules": false
//             }
//           ]
//         ],
//         babelrc: false,
//         exclude: 'node_modules/**'
//       })
//     ]
//     // ,
//     // dest: 'dist/material-toggle.js'
//   })
//   .pipe(source('material-toggle.js'))
//
//   // and output to ./dist/app.js as normal.
//     .pipe(gulp.dest('./dist'));
// });

// gulp.task('default', () => {
//     return rollup({
//      entry: 'src/material-toggle.js',
//      plugins: [
//        babel({
//          presets: [
//            [
//              "es2015", {
//                "modules": false
//              }
//            ]
//          ],
//          babelrc: false,
//          exclude: 'node_modules/**'
//        })
//      ],
//      dest: 'dist/material-toggle.js'
//    })
// });
//
//
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
