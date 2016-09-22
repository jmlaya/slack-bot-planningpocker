import gulp from 'gulp';
import gulpRun from 'gulp-run';

module.exports = function(config) {
    gulp.task('transpile', function() {

        const babelCommand = 'node node_modules/babel-cli/bin/babel';
        const srcFolder = config.transpile.src;
        const destFolder = config.transpile.dest;

        return gulpRun(`${babelCommand} ${srcFolder} --out-dir ${destFolder}`).exec();
    });
};
