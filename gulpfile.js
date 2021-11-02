let gulp = require('gulp');
let less = require('gulp-less');
let browserify = require('gulp-browserify');
//let babelify = require('babelify');
let browserSync = require('browser-sync');
let clean = require('gulp-clean');

gulp.task('clean', function() {
    gulp.src('./dest').pipe(clean())
})
gulp.task('js', () => gulp.src('src/js/index.js')
    .pipe(browserify({
        //insertGlobals : true
    }))
    .pipe(gulp.dest('./dest/js'))
    .pipe(browserSync.stream())
);
gulp.task('html', () =>
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dest/.'))
        .pipe(browserSync.stream())
)
gulp.task('images', () =>
    gulp.src('src/styles/img/**/*.*')
        .pipe(gulp.dest('dest/styles/img/.'))
        .pipe(browserSync.stream())
)
gulp.task('styles', () =>
    gulp.src('src/styles/**/*.less')
        .pipe(less({
            //paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('dest/styles/.'))
        .pipe(browserSync.stream())
)
gulp.task('build', gulp.parallel('html','styles','js','images'));

gulp.task('clean-build', gulp.series('clean', 'build'));

gulp.task('watch', () => {
    gulp.watch('src/js/**/*.js', gulp.series('js'));
    gulp.watch('src/styles/**/*.less', gulp.series('styles'));
    gulp.watch('src/**/*.html', gulp.series('html'));
    gulp.watch('src/styles/img/**/*.*', gulp.series('images'));
})

gulp.task('sync', () => {
    browserSync.init({
        server: {baseDir:'dest/.'}
    })
})

gulp.task('build-sync', gulp.series('build', 'sync'));

gulp.task('default',gulp.parallel('build-sync', 'watch'));