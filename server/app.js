const path = require('path');

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const memoryStore = require('memorystore');
const expressPino = require('express-pino-logger');
const compression = require('compression');
const helmet = require('helmet');
const csurf = require('csurf');

const nonce = require('./middleware/nonce');
const csp = require('./middleware/csp');
const referrerPolicy = require('./middleware/referrer-policy');
const featurePolicy = require('./middleware/feature-policy');
const prometheus = require('./middleware/prometheus');
const createHealth = require('./middleware/health');

const HelloWorldController = require('./components/hello-world/hello-world.controller');

class App {
	constructor(config, api, logger) {
		this.instance = express();
		this.logger = logger;

		this.api = api;
		this.config = config;
		this.logger = logger;

		this.controllers = [
			new HelloWorldController(config, api),
		];

		this.initializeViewRenderer();
		this.initializeMiddlewares();
		this.initializeControllers();
		this.initializeErrorHandling();
	}

	start() {
		this.instance.listen(this.config.server.port, () => {
			this.logger.info(`Server started ${this.config.server.hostName}:${this.config.server.port}`);

			this.instance.set('ready', true);
		});
	}

	initializeViewRenderer() {
		this.instance.set('views', path.join(__dirname, 'views'));
		this.instance.use(express.static(path.join(__dirname, '../static')));
		this.instance.engine('.hbs', exphbs({ extname: '.hbs' }));
		this.instance.set('view engine', '.hbs');
	}

	initializeMiddlewares() {
		const MemoryStore = memoryStore(session);

		// Helmet does not remove 'x-powered-by' from static files
		this.instance.disable('x-powered-by');

		// Trust proxy (loadbalancer) to help set secure cookies
		if (this.config.env.isProduction) {
			this.instance.set('trust proxy', 1);
		}

		this.instance.use(expressPino({ logger: this.logger, useLevel: 'debug' }));

		this.instance.use(compression());
		this.instance.use(bodyParser.json({ limit: '10kb' })); // Limit body payload to prevent DOS Attacks
		this.instance.use(bodyParser.urlencoded({ extended: false }));

		this.instance.use(session({
			cookie: {
				sameSite: true,
				secure: this.config.env.isProduction,
				maxAge: 3600000,
			},
			store: new MemoryStore({
				checkPeriod: 86400000, // prune expired entries every 24h
			}),
			rolling: true,
			resave: true,
			secret: 'fe4ever',
			saveUninitialized: true,
		}));

		this.instance.use(csurf());
		this.instance.use(nonce);
		this.instance.use(helmet());
		this.instance.use(csp(helmet, this.config.csp));
		this.instance.use(referrerPolicy(helmet));
		this.instance.use(featurePolicy(helmet));

		// Sets prometheus to log the resources to prometheus
		this.instance.use(prometheus({ ...this.config.prometheus, log: this.logger }));

		// Sets entry points for (kubernetes) health checks
		const { health, healthcheck } = createHealth(this.instance);

		this.instance.use('/ready',	health.ReadinessEndpoint(healthcheck)); // eslint-disable-line new-cap
		this.instance.use('/health', health.HealthEndpoint(healthcheck)); // eslint-disable-line new-cap
	}

	initializeControllers() {
		this.controllers.forEach((controller) => {
			this.instance.use('/', controller.router);
		});
	}

	initializeErrorHandling() {
		this.instance.use((request, response) => {
			response.status(404);

			response.render('error', {
				title: '404: Pagina niet gevonden',
				error: 'De pagina die je probeert te bereiken kan niet worden gevonden.',
			});
		});

		this.instance.use((error, request, response) => {
			response.status(500);

			response.render('error', {
				title: '500: Internal Server Error',
				error,
			});
		});
	}
}

module.exports = App;
