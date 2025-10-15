const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const { deleteAsync } = require('del'); // ✅ Modern import for del
const imageminGifsicle = require('imagemin-gifsicle');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminOptipng = require('imagemin-optipng');

// 🧹 Clean the dist folder before each build
gulp.task('clean', function () {
  return deleteAsync(['dist']);
});

// 🧩 Compile Nunjucks templates to HTML
gulp.task('templates', function () {
  return gulp.src('src/templates/*.njk')
    .pipe(nunjucksRender({ path: ['src/templates/'] }))
    .pipe(gulp.dest('dist'));
});

// 🎨 Minify CSS files
gulp.task('styles', function () {
  return gulp.src('src/assets/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/assets/css'));
});

// ⚙️ Minify JS files
gulp.task('scripts', function () {
  return gulp.src('src/assets/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('dist/assets/js'));
});

// 🖼️ Optimize images (✅ using installed plugins)
gulp.task('images', function () {
  return gulp.src('src/assets/images/*')
    .pipe(imagemin([
      imageminGifsicle(),
      imageminJpegtran(),
      imageminOptipng()
    ]))
    .pipe(gulp.dest('dist/assets/images'));
});

// 🚀 Default build task: clean + all other tasks in parallel
gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('templates', 'styles', 'scripts', 'images')
));
