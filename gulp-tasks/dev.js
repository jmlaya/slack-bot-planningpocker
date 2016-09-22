import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import gulpSequence from "gulp-sequence";

module.exports = function(config) {
    gulp.task('dev', function() {
        return gulpSequence('clean', 'build', function() {

            var stream = nodemon({
                script: `${config.transpile.dest}/${config.pkg.main}`,
                watch: ['src'],
                tasks: ['build']
            });

            return stream;
        });
    });
};
