import gulp from 'gulp';
import gulpRun from 'gulp-run';

module.exports = function(config) {
    gulp.task('copy', function() {

        const destFolder = config.transpile.dest;
        const srcFolder = config.transpile.src;

        const commands = [
            `mkdir -p ${destFolder}/config/ `,
            `cp ${srcFolder}/config/*.json ${destFolder}/config/`,
        ];

        return gulpRun(commands.join(' && ')).exec();
    });
};
