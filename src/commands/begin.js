import JsonDB from 'node-json-db';
import slackResponse from 'lib/slack-response';
import config from 'loaders/config';

const db = new JsonDB(config.dbName, true, false);

module.exports = (req, res, next, value) => {

    db.push(`/${req.key}`, {
        votes:[]
    });

    res.send(slackResponse('Started new planning poker session', 'in_channel'));
};
