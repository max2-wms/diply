// Importing Packages
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const browerSync = require('browser-sync').create();

// Copy all HTML files
gulp.task(`copyHtml`, () => {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browerSync.stream());
});

// Minify JS
gulp.task('minify', () => {
    gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts/'))
        .pipe(browerSync.stream());
});

// Compile Sass
gulp.task('sass', () => {
    gulp.src('./src/stylesheets/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/stylesheets'))
        .pipe(browerSync.stream());
});

// All tasks
gulp.task('all', ['copyHtml', 'minify', 'sass']);

// Serve files
gulp.task('serve', ['copyHtml', 'minify', 'sass'], () => {
    browerSync.init({
        server: './dist'
    });

    // watching files for changes
    gulp.watch('./src/*.html', ['copyHtml']);
    gulp.watch('./src/*.html').on('change', browerSync.reload);
    gulp.watch('./src/scripts/*.js', ['minify']);
    gulp.watch('./src/stylesheets/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['serve']);