import slackResponse from 'lib/slack-response';

export default (req, res, next, value) => {
    res.send(slackResponse('Begin command recived with: ' + value));
};
