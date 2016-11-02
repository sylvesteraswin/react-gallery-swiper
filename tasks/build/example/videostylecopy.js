import gulp from 'gulp';
import rename from 'gulp-rename';

module.exports = () => {
    return gulp
        .src('node_modules/react-video-js/build/*.css')
        .pipe(rename('video-style.css'))
        .pipe(gulp.dest('example'));
};
