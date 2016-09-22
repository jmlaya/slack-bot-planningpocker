import gulp from 'gulp';
import gulpRun from 'gulp-run';

module.exports = function(config) {
    gulp.task('clean', function() {

        const command = `rm -rf ${config.transpile.dest}`;

        return gulpRun(command).exec();
    });
};
