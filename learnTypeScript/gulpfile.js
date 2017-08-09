/// <binding AfterBuild='less' />
var gulp = require('gulp');
var gutil = require('gulp-util');
var requirejsOptimize = require('gulp-requirejs-optimize');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require("gulp-rename");
var less = require('gulp-less');
var path = require('path');
//var sourcemaps = require('gulp-sourcemaps');
//var cssmin = require('gulp-minify-css');
/*
 * 复制默认皮肤到Content目录
 */
gulp.task("copy_default_css_files", function () {
    //return gulp.src(["bower_components/Teleware.UI.UIBundle/src/Content/**/*"])
    //    .pipe(gulp.dest("Content"))
    return gulp.src([
        "bower_components/Teleware.UI.UIBundle/src/Content/**/*",
        "bower_components/typo/*.css",
        "node_modules/dsmorse-gridster/dist/jquery.gridster.css",
        "node_modules/fullpage.js/dist/jquery.fullpage.css"
    ]).pipe(gulp.dest("Content"))
})

/*
 * 复制JS文件到Scripts/Debug
 */
gulp.task("copy_js_debug_files", function () {
    return gulp.src([
        "bower_components/Teleware.UI.UIBundle/src/Scripts/**/*",
        "bower_components/Teleware.UI.LibBundle/src/**/*",
        "node_modules/mustache/*.js",
        "node_modules/dsmorse-gridster/dist/jquery.gridster.js",
        "node_modules/fullpage.js/dist/jquery.fullpage.js"
    ]).pipe(gulp.dest("Scripts/Debug"))
})

/*
 * 常用脚本文件打成一包
 */
gulp.task('pack_omni_bundle', ["copy_js_debug_files"], function () {
    return gulp.src([
        "Scripts/Debug/omni.bundle.js",
    ]).pipe(requirejsOptimize({
        baseUrl: "Scripts/Debug",
        paths: {
            "jquery": "jquery-1.12.4",
            "jquery.ui": "jquery-ui-1.12.0",
            "knockout": "knockout-3.4.0.debug"
        },
        optimize: 'none'
    })).pipe(uglify({
        mangle: {
            screw_ie8: false
        },
        compress: {
            screw_ie8: false
        },
        output: {
            screw_ie8: false
        }
    })).pipe(rename("omni.bundle.min.js"))
        .pipe(gulp.dest("Scripts"))
});

/*
 * 不常用脚本文件直接复制到Scripts目录
 */
gulp.task('copy_unpacked_js_files', function () {
    return gulp.src([
        "Scripts/Debug/knockout.bundle.extra.js",
        "Scripts/Debug/ko.fieldbindings.js",
        "Scripts/Debug/ko.uploader.js",
        "Scripts/Debug/mustache.min.js",
        "Scripts/Debug/jquery.gridster.js",
        "Scripts/Debug/jquery.fullpage.js"
    ]).pipe(gulp.dest("Scripts"))
})

gulp.task("less", function () {
    return gulp.src(["Content/less/public.less"])
        //.pipe(sourcemaps.init())
        .pipe(less())
        //.pipe(cssmin())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest("Content"))
});


gulp.task('watchless',function(){
return gulp.watch('Content/less/*.less', ['less']).on('change',function(){console.log('watchless....')});
})

/*
 * 首次运行任务，初始化默认文件
 */
gulp.task("first-time", [
    "copy_default_css_files",
    "copy_js_debug_files",
    "pack_omni_bundle",
    "copy_unpacked_js_files"
], function () {
})