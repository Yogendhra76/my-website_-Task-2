const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const { deleteAsync } = require('del');

// 🧹 Clean dist folder
gulp.task('clean', function () {
  return deleteAsync(['dist']);
});

// 🧩 Compile Nunjucks templates
gulp.task('templates', function () {
  return gulp.src('src/templates/*.njk')
    .pipe(nunjucksRender({ path: ['src/templates/'] }))
    .pipe(gulp.dest('dist'));
});

// 🎨 Minify CSS
gulp.task('styles', function () {
  return gulp.src('src/assets/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/assets/css'));
});

// ⚙️ Minify JS
gulp.task('scripts', function () {
  return gulp.src('src/assets/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('dist/assets/js'));
});

// 🖼️ Optimize images — fixed imports for Node 22 + imagemin v8
gulp.task('images', function () {
  const imageminGifsicle = require('imagemin-gifsicle').default;
  const imageminJpegtran = require('imagemin-jpegtran').default;
  const imageminOptipng = require('imagemin-optipng').default;

  return gulp.src('src/assets/images/*')
    .pipe(imagemin([
      imageminGifsicle(),
      imageminJpegtran(),
      imageminOptipng()
    ]))
    .pipe(gulp.dest('dist/assets/images'));
});

// 🚀 Default build task
gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('templates', 'styles', 'scripts', 'images')
));
