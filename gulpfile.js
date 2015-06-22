var gulp 	  = require('gulp');
    concat    = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    uglify 	  = require('gulp-uglify')

gulp.task('styles', function () {
    gulp.src(['./src/public/stylesheets/*.css'])
        .pipe(minifyCSS())
        .pipe(concat('/src/public/stylesheets/dist/styles.min.css'))
        .pipe(gulp.dest('./'))
});


gulp.task('scripts', function () {
    gulp.src(['./src/public/javascripts/*.js'])
        .pipe(uglify())
        .pipe(concat('/src/public/javascripts/dist/scripts.min.js'))
        .pipe(gulp.dest('./'))
});

gulp.task('default', ['styles','scripts']);