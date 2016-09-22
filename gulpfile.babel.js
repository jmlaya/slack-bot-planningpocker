import fs from "fs";
import path from "path";
import gulp from "gulp";
import gulpTaskListing from "gulp-task-listing";

// --------------------------------------------------
// Configs
// --------------------------------------------------
const config = {
    pkg: require('./package'),
    tasks: `${__dirname}/gulp-tasks/`,
    transpile: {
        src: 'src',
        dest: 'bin',
    }
};

// --------------------------------------------------
// Default tasks
// --------------------------------------------------
gulp.task('help', gulpTaskListing);
gulp.task('default', ['help']);

// --------------------------------------------------
// Register all modularized tasks
// --------------------------------------------------
fs.readdirSync(config.tasks)
    .filter(name => /(\.js$)/i.test(path.extname(name)))
    .forEach(task => {
        const taskPath = config.tasks + task;
        try {
            require(taskPath)(config);
        } catch (err) {
            throw new Error('Failed to require task at ' + taskPath);
        }
    });
