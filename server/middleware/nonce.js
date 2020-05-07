const { uuid } = require('uuidv4');

module.exports = (request, response, next) => {
	response.locals.nonce = uuid();

	next();
};
