import fs from "fs";
import morgan from "morgan";
import logrotate from "logrotator";
import { logs, env } from "loaders/config";

const logger = [];

if (env.name !== env.local_environment_name) {

    if (!fs.existsSync(logs.path)) {
        fs.mkdirSync(logs.path);
    }

    logger.push(getLogger(logs.filenames.errors, (req, res) => res.statusCode < 400));
    logger.push(getLogger(logs.filenames.traffic, (req, res) => res.statusCode >= 400));

}

logger.push(morgan('dev'));

module.exports = logger;

function getMinutesToRotate() {
    var now = new Date(),
        startDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return Math.floor((24 * 60) - Math.abs(now.getTime() - startDay.getTime()) / (60 * 1000)) + 'm';
}

function getLogger(filename, skip) {

    var path = `${logs.path}/${filename}`;

    logrotate.rotator.register(path, {
        schedule: getMinutesToRotate(), // How often to check for file rotation conditions
        size: '1k', // Set the minimum to guarantee the rotation by each day
        compress: logs.compress_history, // Whether to gzip rotated files
        count: logs.days_history, // Number of files to keep (90 days)
        format: index => {
            var date = new Date();
            return `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${("0" + date.getDate()).slice(-2)}`;
        }
    });

    return morgan('combined', {
        skip: skip,
        stream: fs.createWriteStream(path, { flags: 'a' })
    });
}
