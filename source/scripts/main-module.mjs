import dynamicImportPolyfill from 'dynamic-import-polyfill';

import { main } from './main.mjs';

// This needs to be done before any dynamic imports are used.
// If your modules are hosted in a sub-directory, it must be specified here.
dynamicImportPolyfill.initialize({
	modulePath: '/js/',
});

// Start the app
main();
