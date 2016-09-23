import JsonDB from 'node-json-db';
import slackResponse from 'lib/slack-response';
import config from 'loaders/config';

const db = new JsonDB(config.env.db_name, true, false);

module.exports = (req, res, next, value) => {

    if (!Number(option)) {
        return res.send(slackResponse('With `vote` command must provide a number as value'));
    }

    var data = db.getData(`/${req.key}`);

    data.votes.push({
        userName: req.payload.user_name,
        vote: value
    });

    db.push(`/${req.key}`, data);

    res.send(slackResponse(`@${req.payload.user_name} has voted`, 'in_channel'));
};
