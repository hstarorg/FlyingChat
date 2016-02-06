'use strict';

var gulp = require('gulp');
var del = require('del');
var argv = require('yargs').argv;
var developServer = require('gulp-develop-server');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

gulp.task('clean', (done) => del(['./dist'], done));

//***********后端代码构建

gulp.task('copyBackendCode', () => gulp.src(['./src/**/*', '!./src/web/**/*']).pipe(gulp.dest('./dist/')));

gulp.task('serve', (done) => {
  developServer.listen({ path: './dist/index.js' });
  done();
});

gulp.task('restartServer', (done) => {
  developServer.restart();
  done();
});

//***********前端代码构建

gulp.task('copyFrontendCode', () => gulp.src(['./src/web/**/*']).pipe(gulp.dest('./dist/web/')));

gulp.task('openBrowser', (done) => {
  browserSync.init({
    proxy: 'localhost:7410',
    ghostMode: false,
    reloadDelay: 500
  });
  done();
});

gulp.task('refreshBrowser', (done) => {
  browserSync.reload();
  done();
});

//**********监控代码变化
gulp.task('watch', (done) => {
  //服务端代码变更，复制服务端代码，重启服务端，刷新浏览器
  gulp.watch(['src/**/*', '!src/web/**/*'], gulp.series('copyBackendCode', 'restartServer', 'refreshBrowser'));
  //服务端代码变更，复制客户端代码，刷新浏览器
  gulp.watch(['src/web/**/*'], gulp.series('copyFrontendCode', 'refreshBrowser'));
  done();
});

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('copyBackendCode', 'copyFrontendCode'),
  'serve',
  'openBrowser',
  'watch'
  ));