const gulp = require('gulp')
const plumber = require('gulp-plumber')
const gutil = require('gulp-util')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()

const src = {
  js: 'src/js/**/*.js',
  sass: 'src/sass/**/**/*.scss',
  img: 'src/img/**/*.*',
  all: '**/**/*.*'
}

const dest = {
  js: 'dist/js',
  css: './',
  img: 'dist/img'
}

gulp.task('serve', ['sass', 'babel'], () => {
    browserSync.init({
        proxy: 'localhost:8888/'
    })
    gulp.watch(src.sass, ['sass'])
    gulp.watch(src.js, ['babel'])
    gulp.watch(src.all).on('change', browserSync.reload)
})

gulp.task('sass', () => {
    return gulp.src(src.sass)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest.css))
        .pipe(browserSync.stream())
})

gulp.task('babel', () => {
  return gulp.src(src.js)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(babel())
    .on('error', (err) => {
      gutil.log(gutil.colors.red('[Compilation Error]'));
      gutil.log(gutil.colors.red(err.message));
    })
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest.js))
    .pipe(browserSync.stream())
})

// `gulp` main task for spinning up browserSync & compiling sass, js
gulp.task('default', ['serve']);
