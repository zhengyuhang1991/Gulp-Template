// Load plugins
const gulp = require('gulp')
const stylus = require('gulp-stylus')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const changed = require('gulp-changed')
const gulpSequence = require('gulp-sequence')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')

let destImages = 'dist/imgs'
let destStylus = 'dist/styles'
let destScripts = 'dist/scripts'

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
    gulp.watch(['dev/stylus/*', 'dev/stylus/**/*'], ['devStyles'])
    gulp.watch(['dev/js/*', 'dev/js/**/*'], ['devScripts'])
    gulp.watch(['dev/*.html', 'dev/pages/*.html'], ['htmlMin'])
    gulp.watch(['dev/imgs/*', 'dev/imgs/**/*'], ['imgOptimize'])
  })

  // 开发环境
  gulp.task('imgOptimize', function () {
    gulp.src([
      'dev/imgs/*',
      'dev/imgs/**/*'
    ])
      .pipe(changed(destImages))
      .pipe(imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true,
        multipass: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
      .pipe(gulp.dest(destImages)
      )
  })
  gulp.task('devStyles', function () {
    return gulp.src('dev/stylus/*.styl')
      .pipe(changed(destStylus))
      .pipe(sourcemaps.init())
      .pipe(stylus())
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
