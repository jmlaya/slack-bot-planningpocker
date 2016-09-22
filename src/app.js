import env from './lib/env';
import fs from 'fs';
import express from "express";
import bodyParser from "body-parser";
import config from "loaders/config";
import middlewares from 'loaders/middlewares';
import logger from "lib/logger";

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

app.use(middlewares.cors);

app.post('/', function(req, res, next) {
    const commands = fs.readdirSync(`${__dirname}/commands`).map(name => name.replace(/(\.js$)/i, ''));
    console.log(req.body);
    res.send(commands);
});

app.use(middlewares.errors);

const server = app.listen(config.env.port);

console.log('Running server at localhost:' + config.env.port);
process.on('SIGTERM', function() {
    console.log('stoping server...');
    server.close();
});

process.on('SIGINT', function() {
    console.log('stoping server...');
    server.close();
});
