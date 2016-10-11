import gulp from 'gulp';
import taskDir from 'task-dir';
import path from 'path';
import livereload from 'gulp-livereload';

taskDir(gulp, path.join(__dirname, 'tasks'));

gulp.task('watch', () => {
    livereload.listen();
    gulp.watch('src/*.jsx', ['build']);
    gulp.watch('example/src/*.jsx', ['build']);
});


gulp.task('dev', ['build', 'server', 'watch']);
