###
  当前使用npm run gulp来启动。
  如果要直接执行gulp命令，那么就必须要新建一个gulpfile.js,并输入以下内容：
  require('coffee-script/register');
  require('./gulpfile.coffee');
###
gulp = require('gulp')
runSequence = require('run-sequence')

coffee = require('gulp-coffee')
gutil = require('gulp-util')
del = require('del')
nodemon = require('gulp-nodemon')
argv = require('yargs').argv
rename = require('gulp-rename')
merge = require('gulp-merge')
browserSync = require('browser-sync')

# 处理参数
isDebug = not (argv.r || false)

# --入口任务-----------------------------------------------------------------
gulp.task('default', (callback)->
  runSequence(
    ['clean']
    ['coffee-server', 'copy-server', 'copy-client', 'coffee-client', 'copy-views', 'copy_log_folder']
    'serve'
    ['browserSync', 'watch']
    callback
  )
)
# --构建相关任务---------------------------------------
gulp.task('clean', (callback)->
  del(['./dist/'], callback)
)

# 创建log文件夹
gulp.task('copy_log_folder', ->
  gulp.src('./src/logs*/*.*')
  .pipe(gulp.dest('./dist/'))
)

gulp.task('coffee-server', ->
  gulp.src([
    './src/**/*.coffee'
    '!./src/assets/**/*.coffee'
  ])
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(gulp.dest('./dist/'))
)

gulp.task('copy-server', ->
  gulp.src([
    './src/config*/*.json'
    './src/database*/*.*'
  ])
  .pipe(gulp.dest('./dist/'))
)

gulp.task('copy-client', ->
  gulp.src([
    './src/assets*/**/*'
    '!./src/assets*/**/*.coffee'
  ])
  .pipe(gulp.dest('./dist/'))
)

gulp.task('coffee-client', ->
  gulp.src([
    './src/assets*/**/*.coffee'
  ])
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(gulp.dest('./dist/'))
)

gulp.task('copy-views', ->
  gulp.src('./src/views/**/*.html')
  .pipe(rename({extname: '.vash'}))
  .pipe(gulp.dest('./dist/views'))
)

# --启动程序,打开浏览器任务----------------------------------------------------
nodemon_instance = undefined
gulp.task('serve', (callback)->
  called = false
  if not nodemon_instance
    nodemon_instance = nodemon({
      script: './dist/index.js'
      ext: 'none'
    })
    .on('restart', ->
      console.log('restart server......................')
    )
    .on('start', ->
      if not called
        called = true
        callback()
    )
  else
    nodemon_instance.emit("restart")
    callback()
  nodemon_instance
)

gulp.task('browserSync', ->
  browserSync({
    proxy: 'localhost:3000'
    port: 8888
  #files: ['./src/public/**/*']
    open: true
    notify: true
    reloadDelay: 500 # 延迟刷新
  })
)



# --监视任务------------------------------------------------
gulp.task('watch', ->
  gulp.watch([
    './src/**/*.*'
    '!./src/**/*.coffee'
    './src/assets/**/*.*'
  ], ['reload-client'])

  gulp.watch([
    './src/**/*.coffee'
    '!./src/assets/**/*.*'
  ], ['reload-server'])
)

gulp.task('reload-client', (callback) ->
  runSequence(
    ['copy-client', 'coffee-client', 'copy-views']
    'bs-reload'
    callback
  )
)

gulp.task('reload-server', (callback) ->
  runSequence(
    ['copy-server', 'coffee-server']
    'serve'
    'bs-reload'
    callback
  )
)

gulp.task('bs-reload', ->
  browserSync.reload()
)
