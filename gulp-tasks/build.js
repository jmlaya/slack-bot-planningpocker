import gulp from 'gulp';

module.exports = function() {
    gulp.task('build', ['transpile', 'copy']);
};
