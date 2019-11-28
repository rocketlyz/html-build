const gulp = require('gulp');
const { clean, copy, replace } = require('./gulp.config.js');

gulp.task('_clean', clean);

gulp.task('_copy', copy);

gulp.task('_replace', replace);


gulp.task('default', function (done) {
  console.log('[!]    前端开发规范-新手上路  gulp dev');
  done();
});
