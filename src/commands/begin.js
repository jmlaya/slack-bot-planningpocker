import slackResponse from 'lib/slack-response';

modeule.exports = (req, res, next, value) => {
    res.send(slackResponse('Begin command recived with: ' + value));
};
