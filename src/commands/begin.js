import slackResponse from 'lib/slack-response';

module.exports = (req, res, next, value) => {
    res.send(slackResponse('Begin command recived with: ' + value));
};
