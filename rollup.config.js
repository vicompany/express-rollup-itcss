

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const LEGACY_BUILD = 'legacy';
const INPUT_DIR = 'source/scripts';
const OUTPUT_DIR = 'static/js';

const isProduction = process.env.NODE_ENV === 'production';

function basePlugins(build = '') {
	const plugins = [
		resolve(),
		commonjs(),
	];

	if (isProduction) {
		plugins.push(terser({
			ecma: build === LEGACY_BUILD ? 5 : 8,
		}));
	}

	return plugins;
}

const moduleConfig = {
	input: `${INPUT_DIR}/main-module.mjs`,

	output: {
		dir: OUTPUT_DIR,
		format: 'esm',
		entryFileNames: '[name].mjs',
		chunkFileNames: '[name]-[hash].mjs',
		dynamicImportFunction: '__import__',
		sourcemap: true,
	},

	plugins: [
		...basePlugins(),
		babel({
			exclude: 'node_modules/**',
		}),
	],
};

const noModuleConfig = {
	input: `${INPUT_DIR}/main-nomodule.mjs`,

	output: {
		dir: OUTPUT_DIR,
		format: 'iife',
		entryFileNames: '[name].js',
		sourcemap: true,
	},

	plugins: [
		...basePlugins(LEGACY_BUILD),
		babel({
			envName: LEGACY_BUILD,
			exclude: 'node_modules/**',
		}),
	],

	inlineDynamicImports: true,
};

export default [
	moduleConfig,
	noModuleConfig,
];
