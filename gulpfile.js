var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('serve', function() {
  connect.server({}, function (){
    browserSync({
      proxy: '127.0.0.1:8000'
    });
  });
  gulp.watch('./assets/less/*.less', ['less']);
  gulp.watch('**/*.php').on('change', function () { browserSync.reload();});
  gulp.watch('./assets/js/*.js').on('change', function () { browserSync.reload();});
});

gulp.task('less', function() {
  return gulp.src('./assets/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream())
});

gulp.task('js', function() {
    return gulp.src([
      './bower_components/jquery/dist/jquery.js',
      './bower_components/lodash/lodash.js',
      './bower_components/bootstrap/dist/js/bootstrap.js',
      // './bower_components/baobab/build/baobab.min.js',
       ],
      {base: 'bower_components/'}
    )
    .pipe(concat('all.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'));
});

gulp.task('default', [ 'js', 'less', 'serve']);
