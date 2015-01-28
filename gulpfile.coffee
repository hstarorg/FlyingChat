gulp = require('gulp')
runSequence = require('gulp-run-sequence')

coffee = require('gulp-coffee')
gutil = require('gulp-util')
del = require('del')
nodemon = require('gulp-nodemon')
argv = require('yargs').argv
imagemin = require('gulp-imagemin')
browserSync = require('browser-sync')
reload = browserSync.reload

# 处理参数
isDebug = not (argv.r || false)

# --入口任务-----------------------------------------------------------------
gulp.task('default', ->
  runSequence(
    'build'
    'serve'
    'watch'
  )
)
# --构建相关任务---------------------------------------
gulp.task('build', (callback) ->
  runSequence(
    'clean'
    ['coffee', 'copy', 'imagemin']
    callback
  )

)

gulp.task('clean', (callback)->
  del(['./dist/'], callback)
)

gulp.task('coffee', ->
  gulp.src('./src/**/*.coffee')
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(gulp.dest('./dist/'))
)

gulp.task('copy', ->
  gulp.src([
    './src/**/*.*'
    '!./src/public/images/**.*'
    '!./src/**/*.coffee'
    './src/public/verder/**/*'])
  .pipe(gulp.dest('./dist/'))
)

gulp.task('imagemin', ->
  gulpStream = gulp.src('./src/public/images/*.jpg')
  if not isDebug
    gulpStream.pipe(imagemin({progressive: true}))
  gulpStream.pipe(gulp.dest('./dist/public/images/'))
  gulpStream
)

# --启动程序,打开浏览器任务----------------------------------------------------
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



# --监视任务------------------------------------------------
gulp.task('watch', ->
  browserSync({
    proxy: 'localhost:3000'
    port: 8888
    #files: ['./src/public/**/*']
    open: true
    notify: true
    reloadDelay: 2000
  })

  gulp.watch('./src/**/*.jade', ['reload-jade'])
  gulp.watch('./src/**/*.coffee', ['reload-coffee'])
)

gulp.task('reload-jade', (callback) ->
  runSequence(
    'copy'
    'bs-reload'
    callback
  )
)

gulp.task('reload-coffee', (callback) ->
  runSequence(
    'coffee'
    'serve'
    'bs-reload'
    callback
  )
)

gulp.task('bs-reload', ->
  browserSync.reload()
)
