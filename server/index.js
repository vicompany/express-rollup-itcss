require('dotenv').config();

// Enable to disable certificate verification
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const App = require('./app');
const Logger = require('@vi/logger');

const config = require('./config');
const api = require('./api');

const logger = new Logger({ seq: config.seq }).create();
const app = new App(config, api, logger);

app.start();

module.exports = app;
