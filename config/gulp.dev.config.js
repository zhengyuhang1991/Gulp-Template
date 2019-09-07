// Load plugins
const gulp = require('gulp')
const scss = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const changed = require('gulp-changed')
const gulpSequence = require('gulp-sequence')
const htmlmin = require('gulp-htmlmin')

let destImages = 'dist/imgs'
let destStyles = 'dist/styles'
let destScripts = 'dist/scripts'

// 开发环境
function development() {
  // 热刷新服务
  gulp.task('serve', function () {
    browserSync({
      server: {
        baseDir: './dist'
      }
    })
    gulp.watch(['dist/*', 'dist/**/*', 'dist/**/**/*'], {cwd: './'}, reload)
  })
  // 文件检查
  gulp.task('watch', function () {
    gulp.watch(['dev/styles/*', 'dev/styles/**/*'], ['devStyles'])
    gulp.watch(['dev/js/*', 'dev/js/**/*'], ['devScripts'])
    gulp.watch(['dev/*.html', 'dev/pages/*.html'], ['htmlMin'])
    gulp.watch(['dev/imgs/*', 'dev/imgs/**/*'], ['imgOptimize'])
  })

  gulp.task('imgOptimize', function () {
    gulp.src([
      'dev/imgs/*',
      'dev/imgs/**/*'
    ])
      .pipe(changed(destImages))
      .pipe(gulp.dest(destImages)
      )
  })
  gulp.task('devStyles', function () {
    return gulp.src('dev/styles/*.scss')
      .pipe(changed(destStyles))
      .pipe(sourcemaps.init())
      .pipe(scss())
      .pipe(sourcemaps.write("maps"))
      .pipe(gulp.dest(destStyles))
  })
  gulp.task('devScripts', function () {
    gulp.src([
      'dev/js/*.js',
      'dev/js/**/*.js'
    ])
      .pipe(changed(destScripts))
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write('maps'))
      .pipe(gulp.dest(destScripts))
  })
  gulp.task('htmlMin', function () {
    return gulp.src([
      'dev/*.html',
      'dev/pages/*.html'
    ])
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('dist'));
  })
  gulp.task('dev', gulpSequence(['devStyles', 'devScripts', 'htmlMin', 'imgOptimize'], 'serve', 'watch'))
}

module.exports = development
