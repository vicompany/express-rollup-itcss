/* eslint-disable no-process-env */
const { cleanEnv, str, url } = require('envalid');

const { CSP_REPORT_URI, CSP_SECRET } = cleanEnv(process.env, {
	CSP_REPORT_URI: url(),
	CSP_SECRET: str(),
});

module.exports = {
	url: CSP_REPORT_URI,
	secret: CSP_SECRET,
};
