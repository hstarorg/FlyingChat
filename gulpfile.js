/**
 * Created by jh3r on 12/19/2014.
 */
var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var del = require('del');
var notify = require('gulp-notify');
var nodemon = require('gulp-nodemon');
var replace = require('gulp-replace');
var argv = require('yargs').argv;
var connect = require('gulp-connect');
var open = require('gulp-open');
var jade = require('gulp-jade');

/**
 * Clean dist folder
 */
gulp.task('clean', function(callback) {
    del(['dist/**/*.*'], callback);
});


/**
 * compile coffee script
 */
gulp.task('coffee', ['clean'], function() {
    var port = argv.port || 1234
    return gulp.src('./src/**/*.coffee')
       // .pipe(replace("port_for_argv", port))
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./dist/'))
       // .pipe(notify({message: "Compiler coffee complete."}));
});

/**
 * copy some project file
 */
gulp.task('copy', ['clean'], function() {
    return gulp.src(['./src/**/*.*','!./src/**/*.coffee', './src/public/verder/**/*'])
        .pipe(gulp.dest('./dist/'))
       // .pipe(notify({message: "Copy file complete."}));
});

gulp.task('jade', ['clean'], function(){
    gulp.src('./src/views/*.jade')
        .pipe(jade({
            client: true
        }))
        .pipe(gulp.dest('./dist/'))
});

/**
 * build
 */
gulp.task('build', ['clean', 'coffee', 'copy']);


/**
 * start server
 * do not using nodemon to watch file.
 */
var nodemon_instance;

gulp.task('serve', function () {
    if(!nodemon_instance){
        nodemon_instance = nodemon(
            {
                script: 'dist/index.js',
                ext: 'none'
            })
            .on('restart', function () {
                console.log("restart server......................")
            });
    } else{
        nodemon_instance.emit("restart");
    }

});

gulp.task('serve_watch', ['serve'], function() {
    return gulp.watch('src/**/*', ['restart']);
});

gulp.task('connect', ['build'], function(){
    connect.server({
        root: 'dist',
        livereload: true
    });
})

gulp.task('open', function(){
    var options = {
        url: 'http://localhost:3000',
        app: 'chrome'
    };
    gulp.src('./index.html') // An actual file must be specified or gulp will overlook the task.
        .pipe(open('', options));
});


/**
 * default task
 */
gulp.task('default', ['build'], function(){
    gulp.start('serve_watch');
});


/**
 * task when files change
 */
gulp.task('restart', ['build'], function(){
    gulp.start('serve');
});