import JsonDB from 'node-json-db';
import slackResponse from 'lib/slack-response';
import config from 'loaders/config';

const db = new JsonDB(config.dbName, true, false);

module.exports = (req, res, next) => {

    try {
        var data = db.getData(`/${req.key}`);
        if(req.command === config.general.begin_command){
            res.send(slackResponse(`Must end the current planning session with command: \`${config.general.end_command}\``));
        } else {
            next();
        }
    } catch(error) {
        if(req.command !== config.general.begin_command){
            res.send(slackResponse(`Must start a planning session with command: \`${config.general.begin_command}\``));
        } else {
            next();
        }
    }
};
