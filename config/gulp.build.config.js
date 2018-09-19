// Load plugins
const gulp = require('gulp')
const stylus = require('gulp-stylus')
const cssmin = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const base64 = require('gulp-base64')
const del = require('del')
const gulpSequence = require('gulp-sequence')

let destStylus = 'dist/styles'
let destScripts = 'dist/scripts'

function production() {
  // 生产环境
  gulp.task('styles', function () {
    return gulp.src('dev/stylus/*.styl')
      .pipe(base64({
        baseDir: 'dist/images',
        extensions: ['svg', 'png', /\.jpg#datauri$/i],
        exclude: [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
        maxImageSize: 10 * 1024,
        debug: true
      }))
      .pipe(stylus())
      .pipe(autoprefixer())
      .pipe(cssmin({
        keepSpecialComments: '*'
      }))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(destStylus))
  })
  gulp.task('scripts', function () {
    gulp.src([
      'dev/js/*.js',
      'dev/js/**/*.js'
    ])
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(destScripts))
  })

  // 清理开发环境文件
  gulp.task('clean', function () {
    return del([destStylus, destScripts])
  })

  // 生成生产环境文件
  gulp.task('build', gulpSequence('clean', 'styles', 'scripts'))
}

module.exports = production
