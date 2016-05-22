var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var sass = require('gulp-sass');
var server = require('gulp-server-livereload');
var useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css');
var ftp = require('gulp-ftp');
var imagemin = require('gulp-imagemin');
 
gulp.task('images', function() {
  return gulp.src('app/img/**/*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('build/img'));
});
 

//////// FTP////////////////// 
gulp.task('ftp', function () {
  return gulp.src('build/**/*')
    .pipe(ftp({
      host: 'host',
      user: 'hane',
      pass: 'pass',
      remotePath: '/public_html/'
    }))
    // you need to have some kind of stream after gulp-ftp to make sure it's flushed 
    // this can be a gulp plugin, gulp.dest, or any kind of stream 
    // here we use a passthrough stream
});     



///////		BUILD   /////////////// 
gulp.task('build', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('build'));
});
////////////////////////////////////
 

////////////	SASS    //////////// 
gulp.task('sass', function () {
  gulp.src('./app/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});
///////////////////////////////

//////////    WIREDEP TASK    ///////// 
gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory: 'app/bower_components'
    }))
    .pipe(gulp.dest('./app'));
});
///////////////////////////////////////

/////////	SERVER 	//////////
gulp.task('webserver', function() {
  gulp.src('./app')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      open: true
    }));
});
/////////////////////////////

gulp.task('watch', function () {
	gulp.watch('bower.json', ['bower']);
	gulp.watch('./app/sass/**/*.sass', ['sass']);
});

gulp.task('default', ['watch', 'webserver', 'images']);