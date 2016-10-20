'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');

gulp.task('env:dev', function(){
    process.env.NODE_ENV = 'development';
});

gulp.task('env:prod', function(){
    process.env.NODE_ENV = 'production';
});

gulp.task('nodemon', function (cb) {
    var started = false;
    return nodemon({
        script: 'server.js',
        ext:'js html jade css',
        env:{'NODE_ENV': process.env.NODE_ENV}
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('./public/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/styles/'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./public/styles/**/*.scss', ['sass']);
});

gulp.task('develop', ['env:dev', 'nodemon', 'sass:watch']);

gulp.task('default', ['env:prod', 'nodemon']);