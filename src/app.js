import env from './lib/env';
import fs from 'fs';
import express from "express";
import bodyParser from "body-parser";
import config from "loaders/config";
import middlewares from 'loaders/middlewares';
import logger from "lib/logger";
import slackResponse from "lib/slack-response";
import JsonDB from 'node-json-db';

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

app.use(middlewares.cors);
app.use(middlewares.parseMessage);
app.use(middlewares.validateSession);

app.get('/', function(req, res){
    const db = new JsonDB(config.env.db_name, true, false);
    res.send(db.getData('/'));
});

app.post('/', function(req, res, next) {
    require(`commands/${req.command}`)(req, res, next, (req.commandParams ? req.commandParams : undefined));
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
