/* eslint-disable no-process-env */
const { cleanEnv, str, url } = require('envalid');
const os = require('os');

const { SEQ_ENDPOINT, SEQ_KEY, SEQ_ENVIRONMENT, SEQ_DATACENTER } = cleanEnv(process.env, {
	SEQ_ENDPOINT: url(),
	SEQ_KEY: str(),
	SEQ_ENVIRONMENT: str(),
	SEQ_DATACENTER: str(),
});

module.exports = {
	enabled: false,
	endpoint: SEQ_ENDPOINT,
	apikey: SEQ_KEY,
	environment: SEQ_ENVIRONMENT,
	application: 'VI Company',
	project: 'Express Rollup ITCSS recipe',
	machineName: os.hostname(),
	minLevel: 30,
	datacenter: SEQ_DATACENTER,
};
