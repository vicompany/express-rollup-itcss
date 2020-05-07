const { cleanEnv, str, num } = require('envalid');

const { HOSTNAME, PORT } = cleanEnv(process.env, {
	HOSTNAME: str(),
	PORT: num(),
});

module.exports = {
	hostName: HOSTNAME,
	port: PORT,
};
