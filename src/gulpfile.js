var gulp 	  = require('gulp');
    concat    = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),

gulp.task('styles', function () {
    gulp.src(['./public/stylesheets/*.css'])
        .pipe(minifyCSS())
        .pipe(concat('/public/stylesheets/style.min.css'))
        .pipe(gulp.dest('./'))
});

gulp.task('default', ['styles']);