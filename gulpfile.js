require('shelljs/global');
const gulp = require('gulp4');
const devServer = require('gulp-develop-server');
const notifier = require('node-notifier');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

const babelOption = {
  presets: ['es2015'],
  comments: false,
  minified: process.argv.indexOf('-r') >= 0
};

const notify = (msg, autoRun = false) => {
  if (autoRun) {
    return notifier.notify({ message: msg });
  }
  return done => {
    notifier.notify({ message: msg });
    done();
  };
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
    } else {
      notify('服务已启动！', true);
    }
    done();
  });
});

gulp.task('restart', done => {
  devServer.restart(err => {
    if (err) {
      console.error(err);
    } else {
      notify('服务已重新启动！');
    }
    done();
  });
});

gulp.task('assets.js', () => {
  return gulp.src([
    './node_modules/es6-shim/es6-shim.min.js',
    './node_modules/jquery/dist/jquery.min.js',
    './static/vendor/jquery.backstretch.min.js',
    './static/vendor/layui/layui.all.js',
    './static/vendor/j-browser-tab.min.js',
    './node_modules/vue/dist/vue.min.js'
  ])
    .pipe(concat('assets.js', { newLine: ';' }))
    .pipe(gulp.dest('dist/static/js'));
});

gulp.task('assets.css', () => {
  return gulp.src([
    './node_modules/normalize.css/normalize.css',
    './static/vendor/layui/css/layui.css'
  ])
    .pipe(concat('assets.css', { newLine: '\n\n' }))
    .pipe(gulp.dest('dist/static/css'));
});

gulp.task('assets.copy', done => {
  gulp.src([
    './static/vendor/layui/fon[t]/**/*',
    './static/image[s]/**/*'
  ])
    .pipe(gulp.dest('dist/static'));
  gulp.src([
    './static/vendor/layui/cs[s]/**/*'
  ])
    .pipe(gulp.dest('dist/static/js'));
  done();
});

gulp.task('assets', gulp.parallel('assets.js', 'assets.css', 'assets.copy'));

gulp.task('app.js', () => {
  return gulp.src('static/js/*.js')
    .pipe(babel(babelOption))
    .pipe(gulp.dest('dist/static/js'));
});

gulp.task('app', gulp.parallel('app.js'));

gulp.task('watch', done => {
  gulp.watch([
    'src/**/*',
    '!src/logs/**/*',
    '!src/database/**/*'
  ], gulp.series('copy', 'restart', notify('服务已重新启动！')));
  gulp.watch([
    'static/js/*.js'
  ], gulp.series('app'));
  done();
});

gulp.task('dev', gulp.series('clean', gulp.parallel('copy', 'assets', 'app'), gulp.parallel('serve', 'watch')));
