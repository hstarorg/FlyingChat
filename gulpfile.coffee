gulp = require('gulp')
runSequence = require('gulp-run-sequence')

coffee = require('gulp-coffee')
gutil = require('gulp-util')
del = require('del')
nodemon = require('gulp-nodemon')
argv = require('yargs').argv
open = require('gulp-open')
imagemin = require('gulp-imagemin')

# 处理参数
isDebug = not (argv.r || false)

gulp.task('default', ->
  runSequence(
    'clean'
    if isDebug then ['coffee', 'copy'] else ['coffee', 'copy', 'imagemin']
    ['serve', 'serve_watch']
    'open'
  )
)
# -----------------------------------------

gulp.task('clean', (callback)->
  del(['./dist/'], callback)
)

gulp.task('coffee', ->
  gulp.src('./src/**/*.coffee')
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(gulp.dest('./dist/'))
)

gulp.task('imagemin', ->
  gulp.src('./src/public/images/*.jpg')
  .pipe(imagemin({progressive: true}))
  .pipe(gulp.dest('./dist/public/images/'))
)

gulp.task('copy', ->
  gulp.src([
    './src/**/*.*'
    '!./src/public/images/**.*'
    '!./src/**/*.coffee'
    './src/public/verder/**/*'])
  .pipe(gulp.dest('./dist/'))
)

nodemon_instance = undefined
gulp.task('serve', ->
  if not nodemon_instance
    nodemon_instance = nodemon({
      script: './dist/index.js'
      ext: 'none'
    })
    .on('restart', ->
      console.log('restart server......................')
    )
  else
    nodemon_instance.emit("restart")
)

gulp.task('serve_watch', ->
  gulp.watch('./src/**/*', ['restart'])
)

gulp.task('restart', ->
  runSequence(
    'clean'
    ['coffee', 'copy', 'imagemin']
    ['serve']
  )
)

gulp.task('open', ->
  options = {
    url: 'http://localhost:3000'
  }
  gulp.src('./dist/index.js') # An actual file must be specified or gulp will overlook the task.
  .pipe(open('', options))
)
