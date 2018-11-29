// Load plugins
const gulp = require('gulp')
const stylus = require('gulp-stylus')
const cssmin = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const del = require('del')
const gulpSequence = require('gulp-sequence')
const htmlmin = require('gulp-htmlmin')
const rev = require('gulp-revm')
const revCollector = require('gulp-revm-collector')

let destStylus = 'dist/styles'
let destScripts = 'dist/scripts'
let destImages = 'dist/imgs'

let revCss = 'rev/css'
let revJs = 'rev/js'
let revImgs = 'rev/imgs'

// 生产环境
function production() {
  gulp.task('imgOptimize', function () {
    gulp.src([
      'dev/imgs/*',
      'dev/imgs/**/*'
    ])
      .pipe(rev())
      .pipe(gulp.dest(destImages))
      .pipe(rev.manifest())
      .pipe(gulp.dest(revImgs))
  })
  gulp.task('styles', function () {
    return gulp.src('dev/stylus/*.styl')
      .pipe(stylus())
      .pipe(autoprefixer())
      .pipe(cssmin({
        keepSpecialComments: '*'
      }))
      .pipe(rev())
      .pipe(gulp.dest(destStylus))
      .pipe(rev.manifest())
      .pipe(gulp.dest(revCss))
  })
  gulp.task('scripts', function () {
    gulp.src([
      'dev/js/*.js',
      'dev/js/**/*.js'
    ])
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(uglify())
      .pipe(rev())
      .pipe(gulp.dest(destScripts))
      .pipe(rev.manifest())
      .pipe(gulp.dest(revJs))
  })
  gulp.task('rev', function () {
    return gulp.src(['rev/**/*.json', 'dev/*.html', 'dev/pages/*.html'])
      .pipe(revCollector({
        replaceReved: true,
        dirReplacements: {
          'styles': 'styles',
          'scripts': 'scripts',
          'imgs': 'imgs'
        }
      }))
      .pipe(htmlmin({
        collapseWhitespace: true
      }))
      .pipe(gulp.dest('dist'))
  })

  // 清理开发环境文件
  gulp.task('clean', function () {
    return del('dist')
  })

  // 生成生产环境文件
  gulp.task('build', gulpSequence('clean', 'imgOptimize', ['styles', 'scripts'], 'rev'))
}

module.exports = production
