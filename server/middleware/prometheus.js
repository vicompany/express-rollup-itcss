const client = require('prom-client');

module.exports = ({ enabled = true, url, name, job, instance, group, interval, log }) => {
	const pushGateway = new client.Pushgateway(url);

	const push = async () => {
		const groupings = {
			environment: instance,
			app: name,
		};

		if (group) {
			groupings.group = group;
		}

		pushGateway.pushAdd({ jobName: job, groupings }, (error) => {
			if (error) {
				log.error(error);
			}
		});

		return setTimeout(() => push(), interval);
	};

	if (enabled) {
		// Start collecting the default metrics
		client.collectDefaultMetrics();

		// Push metrics to the gateway
		push();
	}

	return (request, response, next) => {
		request.client = client;

		next();
	};
};
