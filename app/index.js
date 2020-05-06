// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const app = require('./app');
const config = require('./config');

app.listen(config.server.port, () => {
	console.log(`Listening on http://localhost:${config.server.port}`);
});
