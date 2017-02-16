require('shelljs/global');
const gulp = require('gulp4');
const devServer = require('gulp-develop-server');
const notifier = require('node-notifier');

const notify = msg => {
  notifier.notify({
    message: msg,
    title: 'Info',
    timeout: 2
  });
};

gulp.task('clean', done => {
  rm('-rf', 'dist');
  done();
});

gulp.task('copy', () => {
  return gulp.src([
    'src/**/*',
    '!src/logs',
    '!src/database'
  ]).pipe(gulp.dest('dist'));
});

gulp.task('serve', done => {
  devServer.listen({ path: './dist/index.js' }, err => {
    if (err) {
      console.error(err);
    }
    done();
  });
});

gulp.task('restart', done => {
  devServer.restart(err => {
    if (err) {
      console.error(err);
    }
    done();
  });
});

gulp.task('watch', () => {
  return gulp.watch([
    'src/**/*',
    '!src/logs/**/*',
    '!src/database/**/*'
  ], gulp.series('copy', 'restart', done => {
    notify('服务已重新启动！');
    done();
  }));
});

gulp.task('dev', gulp.series('clean', 'copy', 'serve', 'watch'));
