const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const del = require('del');
const replace = require('gulp-replace');
const { PROJECT_PATH, TEMPLATE_DIR, TARGET_DIR } = require('./config.js');


const TEMPLATE_PATH = path.resolve(PROJECT_PATH, TEMPLATE_DIR);
const DIST_PATH = path.resolve(PROJECT_PATH, TARGET_DIR);

module.exports.clean = function () {
  return del([
    path.resolve(DIST_PATH, '*')
  ]);
};

module.exports.copy = function() {
  const REG = new RegExp('([0-9a-z]*)-stamp4hash\.(css)', 'ig');

  return gulp.src(path.resolve(TEMPLATE_PATH, '*.html')).
        pipe(replace(REG, function (match, p1, p2) {
          return '';
        })).
        pipe(gulp.dest(DIST_PATH));
}

module.exports.replace = function () {
  const assetsMap = JSON.parse(fs.readFileSync(path.resolve(PROJECT_PATH, 'webpack-assets.json')));

  const REG = new RegExp('([0-9a-z]*)-stamp4hash\.(js)', 'ig');

  return gulp.src(path.resolve(TEMPLATE_PATH, '*.html'))
    .pipe(replace(REG, function (match, p1, p2) {
      return assetsMap[p1][p2];
    }))
    .pipe(gulp.dest(DIST_PATH));
};
