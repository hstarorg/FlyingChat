'use strict';

var gulp = require('gulp');
var del = require('del');
var argv = require('yargs').argv;
var developServer = require('gulp-develop-server');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

// 公共任务
gulp.task('clean', done => del(['./dist'], done));

// 处理后端任务

gulp.task('server.copy', _ =>
  gulp.src('./server/**/*')
    .pipe(gulp.dest('./dist/'))
);

gulp.task('server.serve', done => {
  developServer.listen({ path: './dist/index.js' });
  done();
});

gulp.task('server.restart', done => {
  developServer.restart();
  done();
});

gulp.task('server.watch', () => {
  return gulp.watch('server/**/*', gulp.series('server.copy', 'server.restart'));
});

gulp.task('buildServer', gulp.series('server.copy', 'server.serve', 'server.watch'));

// 处理前端任务parallel

gulp.task('client.copy', () =>
  gulp.src('./client/**/*')
    .pipe(gulp.dest('./dist/client/'))
);

gulp.task('client.serve', done => {
  browserSync.init({

  })
});

gulp.task('client.watch', (done) => {
  gulp.watch('client/index.html', gulp.series('client.copy'));
  done();
});

gulp.task('buildClient', gulp.series('client.copy', 'client.watch'));





// 默认任务

gulp.task('default', gulp.series('clean', 'buildClient', 'buildServer'));

// gulp.task('copyBackendCode', () => gulp.src(['./src/**/*', '!./src/web/**/*']).pipe(gulp.dest('./dist/')));


// //***********前端代码构建

// gulp.task('copyFrontendCode', () => gulp.src(['./src/web/**/*']).pipe(gulp.dest('./dist/web/')));

// gulp.task('openBrowser', (done) => {
//   browserSync.init({
//     proxy: 'localhost:7410',
//     ghostMode: false,
//     reloadDelay: 500
//   });
//   done();
// });

// gulp.task('refreshBrowser', (done) => {
//   browserSync.reload();
//   done();
// });

// //**********监控代码变化
// gulp.task('watch', (done) => {
//   //服务端代码变更，复制服务端代码，重启服务端，刷新浏览器
//   gulp.watch(['src/**/*', '!src/web/**/*'], gulp.series('copyBackendCode', 'restartServer', 'refreshBrowser'));
//   //服务端代码变更，复制客户端代码，刷新浏览器
//   gulp.watch(['src/web/**/*'], gulp.series('copyFrontendCode', 'refreshBrowser'));
//   done();
// });
