import fs from "fs";

module.exports = (req, res, next) => {
    const commands = fs.readdirSync(`${__dirname}/commands`).map(name => name.replace(/(\.js$)/i, '')),
          options = (req.body && req.body.text) ? req.body.text.split(' ') : [];

    if (!commands.includes(options[0])) {
        res.send(slackResponse(`Must provide one of this commands: \`${commands.join('` `')}\``));
    } else {
        req.key = `${req.body.team_id}:${req.body.channel_id}`;
        req.payload = req.body;
        req.command = options[0];
        req.commandParams = options[1];
        next();
    }
};
