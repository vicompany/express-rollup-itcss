const health = require('@cloudnative/health-connect');

// checks
const healthcheck = new health.HealthChecker();

module.exports = (app) => {
	const startStatus = async () => {
		if (app.get('ready')) {
			return 'App is ready';
		}

		throw new Error('App is not yet ready');
	};

	healthcheck.registerStartupCheck(new health.StartupCheck('startCheck', startStatus));

	// Live check
	const liveStatus = async () => {
		if (app.get('ready')) {
			return 'App is live';
		}

		throw new Error('App is not live');
	};

	healthcheck.registerLivenessCheck(new health.LivenessCheck('liveCheck', liveStatus));

	return {
		health,
		healthcheck,
	};
};
