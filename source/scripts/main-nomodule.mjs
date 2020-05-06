// Import any polyfills not in core-js here before main (e.g. whatwg-fetch, dom4).
import 'whatwg-fetch';

import { check } from './browser-support.mjs';
import { main } from './main.mjs';

check();

// Start the app
main();

