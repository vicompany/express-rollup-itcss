function setBrowserslistEnv(env = '') {
	process.env.BROWSERSLIST_ENV = env;
}

module.exports = (api) => {
	// Before every build set the correct BROWSERSLIST_ENV
	setBrowserslistEnv(api.env());

	return {
		presets: [
			['@babel/preset-env', {
				bugfixes: true, // Remove when Babel 8.0 has been released: https://babeljs.io/blog/2020/03/16/7.9.0
				useBuiltIns: 'usage',
				corejs: 3,
			}],
		],

		env: {
			legacy: {
				presets: [
					['@babel/preset-env', {
						useBuiltIns: 'usage',
						corejs: 3,
						exclude: [
							// Don't convert async functions to generators.
							'@babel/plugin-transform-async-to-generator',
							'@babel/plugin-transform-regenerator',
						],
					}],
				],
				plugins: [
					// But convert async functions to promises.
					'babel-plugin-transform-async-to-promises',
				],
			},
		},
	};
};
