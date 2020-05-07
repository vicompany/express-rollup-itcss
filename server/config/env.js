/* eslint-disable no-process-env */
const { cleanEnv } = require('envalid');

const { isProduction, isTest, isDev } = cleanEnv(process.env);

module.exports = {
	isDev,
	isTest,
	isProduction,
};
