var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    connect     = require('gulp-connect-php'),
    less        = require('gulp-less'),
    plumber     = require('gulp-plumber'),
    uglify      = require('gulp-uglify'),
    ftp = require( 'vinyl-ftp' ),
    serverConfig = require('./serverConfig.json')

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
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(less())
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream())
});

gulp.task('js', function() {
    return gulp.src([
      './bower_components/jquery/dist/jquery.min.js',
      './bower_components/lodash/lodash.js',
      './bower_components/bootstrap/dist/js/bootstrap.js',
      './bower_components/fullpage.js/jquery.fullPage.min.js'
      // './bower_components/baobab/build/baobab.min.js',
       ],
      {base: 'bower_components/'}
    )
    .pipe(concat('all.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'));
});

gulp.task( 'deploy', function () {

    var conn = ftp.create(serverConfig);
    var globs = [
      './assets/**',
      './*.php',
      // './content/**',
      './kirby/**',
      './panel/**',
      './site/**',
      './.htaccess'
    ];

    return gulp.src( globs, { base: '.', buffer: false } )
        .pipe( conn.newer( '/www/' ) ) // only upload newer files
        .pipe( conn.dest( '/www/' ) );
});


gulp.task('default', [ 'js', 'less', 'serve']);
