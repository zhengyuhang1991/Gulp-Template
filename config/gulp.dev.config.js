// Load plugins
const gulp = require('gulp')
const stylus = require('gulp-stylus')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const changed = require('gulp-changed')
const gulpSequence = require('gulp-sequence')

let destStylus = 'dist/styles'
let destScripts = 'dist/scripts'

function development() {
  // 热刷新服务
  gulp.task('serve', function () {
    browserSync({
      server: {
        baseDir: './'
      }
    })
    gulp.watch(['dist/*', 'dist/**/*', 'dist/**/**/*'], {cwd: './'}, reload)
  })
  // 文件检查
  gulp.task('watch', function () {
    gulp.watch(['dev/stylus/*', 'dev/stylus/**/*'], ['devStyles'])
    gulp.watch(['dev/js/*', 'dev/js/**/*'], ['devScripts'])
  })

  // 开发环境
  gulp.task('devStyles', function () {
    return gulp.src('dev/stylus/*.styl')
      .pipe(changed(destStylus))
      .pipe(sourcemaps.init())
      .pipe(stylus())
      .pipe(rename({suffix: '.min'}))
      .pipe(sourcemaps.write("maps"))
      .pipe(gulp.dest(destStylus))
  })
  gulp.task('devScripts', function () {
    gulp.src([
      'dev/js/*.js',
      'dev/js/**/*.js'
    ])
      .pipe(changed(destScripts))
      .pipe(sourcemaps.init())
      .pipe(rename({suffix: '.min'}))
      .pipe(sourcemaps.write('maps'))
      .pipe(gulp.dest(destScripts))
  })
  gulp.task('dev', gulpSequence(['devStyles', 'devScripts'], 'serve', 'watch'))
}

module.exports = development
