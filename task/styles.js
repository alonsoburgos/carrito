"use strict";var gulp=require("gulp"),conf=require("./conf"),rename=require("gulp-rename"),uglify=require("gulp-uglify"),uglifycss=require("gulp-uglifycss"),concat=require("gulp-concat"),replace=require("gulp-replace"),ngAnnotate=require("gulp-ng-annotate");gulp.task("dist-css",function(){return gulp.src(conf.appFiles.css).pipe(concat("application.css",{newLine:""})).pipe(replace(/\.\.\/font\//g,"/app/assets/fonts/")).pipe(uglifycss()).pipe(rename({suffix:".min"})).pipe(replace(/\/app\//g,"./app/")).pipe(gulp.dest(conf.paths.src))});