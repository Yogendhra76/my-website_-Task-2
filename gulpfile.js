const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const { deleteAsync } = require('del'); // 


gulp.task('clean', function () {
  return deleteAsync(['dist']); 
});


gulp.task('templates', function () {
  return gulp.src('src/templates/*.njk')
    .pipe(nunjucksRender({ path: ['src/templates/'] }))
    .pipe(gulp.dest('dist'));
});


gulp.task('styles', function () {
  return gulp.src('src/assets/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/assets/css'));
});


gulp.task('scripts', function () {
  return gulp.src('src/assets/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('dist/assets/js'));
});


gulp.task('images', function () {
  return gulp.src('src/assets/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/images'));
});


gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('templates', 'styles', 'scripts', 'images')
));
