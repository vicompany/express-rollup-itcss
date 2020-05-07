/* eslint-disable no-process-env */
const { cleanEnv, str, bool, url } = require('envalid');

const { PROMETHEUS_ENABLED, PROMETHEUS_JOB, PROMETHEUS_ENDPOINT, PROMETHEUS_INSTANCE } = cleanEnv(process.env, {
	PROMETHEUS_ENABLED: bool(),
	PROMETHEUS_JOB: str(),
	PROMETHEUS_ENDPOINT: url(),
	PROMETHEUS_INSTANCE: str(),
});

module.exports = {
	enabled: PROMETHEUS_ENABLED,
	url: PROMETHEUS_ENDPOINT,
	name: 'your-application-name',
	job: PROMETHEUS_JOB,
	instance: PROMETHEUS_INSTANCE.toLowerCase(),
	group: 'your-application-groupname',
	interval: 5000,
};
