'use strict';

let gulp = require('gulp');
let developServer = require('gulp-develop-server');
let gulpNotify = require('gulp-notify');

let notify = (msg) => gulp.src('./gulpfile.js').pipe(gulpNotify(msg));

gulp.task('serve', (done) => {
  developServer.listen({ path: './src/index.js' });
  done();
});

gulp.task('restart', done => {
  developServer.restart();
  done();
});

gulp.task('watch', () => {
  return gulp.watch([
    'src/**/*',
    '!src/logs/**/*',
    '!src/database/**/*'
  ], gulp.series('restart', () => notify('服务已重新启动！')));
});

// 默认任务
gulp.task('default', gulp.series('serve', 'watch'));