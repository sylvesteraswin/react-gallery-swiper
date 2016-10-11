import gulp from 'gulp';
import babel from 'gulp-babel';

module.exports = () => {
  return gulp
    .src([
      'src/*.jsx'
    ])
    .pipe(babel())
    .pipe(gulp.dest('lib'));
};
