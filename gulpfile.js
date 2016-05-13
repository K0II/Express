var gulp = require('gulp');
var sass = require('gulp-sass');
var minifycss = require('gulp-clean-css');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');


gulp.task('css',function(){
    gulp.src('./public/src/styles/**/*.scss')
          .pipe(sass())  // 合并 -> css
          .pipe(minifycss())  // 压缩 dist/css 所有css文件
          .pipe(autoprefixer())
          .pipe(rename("main.min.css")) //重命名
          .pipe(gulp.dest('./public/dist/css'));
});
gulp.task('js',function(){
    gulp.src('./public/src/scripts/*.js')
          .pipe(concat('app.js'))    //  合并js
          .pipe(uglify())    //  压缩 src/scripts 下的所有 js文件
          .pipe(rename('app.min.js'))  // 重命名
          .pipe(gulp.dest('./public/dist/js'));  //dist/js/app.min.js
});

// 压缩图片文件
gulp.task('img',function(){
    return gulp.src('./public/src/images/*.{png,jpg,jpeg,gif,svg,ico}')
          .pipe(imagemin())
          .pipe(gulp.dest('./public/dist/img'));
});


// 执行任务前先删除一次 dist目录
gulp.task('clean', function() {
    gulp.src(['./public/dist/css','./public/dist/js','./public/dist/img'], {read: false})
        .pipe(clean());
});

gulp.task('serve', function() {
    browserSync({
        files: "**",
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./public/src/styles/*/*.scss',['css']);
    gulp.watch('./public/src/images/**/*',['images']);
    gulp.watch('./public/src/scripts/*.js',['js']);
    browserSync.reload();
});
//
// gulp.task('browser-sync', function () {
//    var files = [
//       'public/src/styles/**/*.scss',
//       'public/src/scripts/*.js',
//       'public/src/images/*.{png,jpg,jpeg,gif,svg,ico}'
//    ];
//    browserSync.init(files, {
//       port: 8081,
//       server: {
//          baseDir: './views'
//       }
//    });
// });
// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function(){
     gulp.start('css','js','img','serve');
});
