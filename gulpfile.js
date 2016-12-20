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

gulp.task('serve', done => {
	devServer.listen({ path: './src/index.js' });
	done();
});

gulp.task('restart', done => {
	devServer.restart();
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
gulp.task('default', gulp.series('clean', 'serve', 'watch'));
