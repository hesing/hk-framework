var gulp = require('gulp');
var concat = require('gulp-concat');
var angularFilesort = require('gulp-angular-filesort');
var strip = require('gulp-strip-line');
var templateCache = require('gulp-angular-templatecache');

var rootPath = "public/";

gulp.task('buildMenuTemplateCache', function () {
    return gulp
        .src([
            rootPath+'ext-modules/hkMenu/**/*.html'
        ])
        .pipe(templateCache({
            root: 'ext-modules/hkMenu/',
            module: 'hkMenu'
        }))
        .pipe(gulp.dest(rootPath+'ext-modules/hkMenu/'))
    ;
});

gulp.task('buildDashboardTemplateCache', function () {
    return gulp
        .src([
            rootPath+'ext-modules/hkDashboard/**/*.html'
        ])
        .pipe(templateCache({
            root: rootPath+'ext-modules/hkDashboard/',
            module: 'hkDashboard'
        }))
        .pipe(gulp.dest(rootPath+'ext-modules/hkDashboard/'))
    ;
});

gulp.task('buildFrameworkTemplateCache', function () {
    return gulp
        .src([
            rootPath+'ext-modules/hkFramework/**/*.html'
        ])
        .pipe(templateCache({
            root: rootPath+'ext-modules/hkFramework/',
            module: 'hkFramework'
        }))
        .pipe(gulp.dest(rootPath+'ext-modules/hkFramework/'))
    ;
});

gulp.task('buildJavaScript', function () {
    return gulp
        .src([
            rootPath+'ext-modules/**/*.js'
        ])
        .pipe(angularFilesort())
        .pipe(strip(["use strict"]))
        .pipe(concat('hkFramework.js'))
        .pipe(gulp.dest(rootPath+'vendor/'))
    ;
});

gulp.task('buildCSS', function () {
    return gulp
        .src([
            rootPath+'ext-modules/**/*.css'
        ])
        .pipe(concat('hkFramework.css'))
        .pipe(gulp.dest(rootPath+'css/'))
    ;
});

gulp.task("default", [ "buildMenuTemplateCache", "buildDashboardTemplateCache", "buildFrameworkTemplateCache", "buildJavaScript", "buildCSS"]);