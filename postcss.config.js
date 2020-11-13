const atImport = require('postcss-import');
const csso = require('postcss-csso');
const customProperties = require('postcss-custom-properties');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
	map: {
		inline: false,
	},
	plugins: [
		atImport(),
		postcssPresetEnv({
			// For an overview of all stages check: https://cssdb.org/
			stage: 2,
			features: {
				'nesting-rules': true,
				'custom-media-queries': true,
			},
		}),
		customProperties({
			preserve: false,
		}),
		csso({
			sourceMap: true,
		}),
	],
};
