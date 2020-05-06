const { cleanEnv, url } = require('envalid');

const { API_SERVICE_URL } = cleanEnv(process.env, {
	API_SERVICE_URL: url(),
});

module.exports = {
	api: API_SERVICE_URL,
};
