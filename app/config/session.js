const { cleanEnv, url: str } = require('envalid');

const { SESSION_SECRET } = cleanEnv(process.env, {
	SESSION_SECRET: str(),
});

module.exports = {
	secret: SESSION_SECRET,
};
