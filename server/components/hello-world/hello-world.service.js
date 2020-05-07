const generateRandomInt = max => Math.floor(Math.random() * Math.floor(max));

class HelloWorldService {
	constructor(config, api) {
		this.config = config;
		this.api = api;
	}

	async getRandomCatFact() {
		const facts = await this.api.get('facts');
		const randomFact = facts.all[generateRandomInt(facts.all.length)];

		return randomFact.text;
	}
}

module.exports = HelloWorldService;
