const got = require('got');
const config = require('./config');

const api = got.extend({
	prefixUrl: config.services.api,
	timeout: 10000,
});

module.exports = api;
