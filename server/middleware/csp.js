const reportUri = require('@vi/report-uri');

module.exports = ({ contentSecurityPolicy }, { url, secret }) => {
	const reporterUri = reportUri(url, secret);

	return contentSecurityPolicy({
		directives: {
			baseUri: ['\'self\''],
			defaultSrc: ['\'self\''],
			imgSrc: ['\'self\''],
			scriptSrc: ['\'self\'', (req, res) => `'nonce-${res.locals.nonce}'`],
			styleSrc: ['\'self\'', (req, res) => `'nonce-${res.locals.nonce}'`],
			fontSrc: ['\'self\''],
			connectSrc: ['\'self\''],
			sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin'],
			frameAncestors: ['\'self\''],
			frameSrc: ['\'self\''],
			objectSrc: ['\'none\''],
			reportUri: (req, res) => reporterUri(),
		},
		browserSniff: false,
	});
};
