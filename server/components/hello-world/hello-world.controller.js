const { Router } = require('express');

const HelloWorldService = require('./hello-world.service');

const ROUTER_PATH = '/';

class HelloWorldController {
	constructor(config, api) {
		this.config = config;
		this.api = api;

		this.service = new HelloWorldService(config, api);
		this.router = new Router();
		this.path = ROUTER_PATH;

		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.get(`${this.path}/`, this.homepage.bind(this));
	}

	async homepage(request, response) {
		const fact = await this.service.getRandomCatFact();

		response.render('hello-world', { fact });
	}
}

module.exports = HelloWorldController;
