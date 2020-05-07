const got = require('got');

const config = require('./config');

const isJsonResponse = response => response.headers['content-type'] && response.headers['content-type'].includes('application/json');

const api = got.extend({
	prefixUrl: config.services.api,
	resolveBodyOnly: true,
	timeout: 10000,
	hooks: {
		afterResponse: [
			(response) => {
				if (isJsonResponse(response)) {
					try {
						response.body = JSON.parse(response.body);
					} catch (error) {
						console.error(error);
					}
				}

				return response;
			},
		],
		beforeError: [
			(error) => {
				if (error.statusCode >= 500) {
					console.error(error);
				}

				return error;
			},
		],
	},
});

module.exports = api;
