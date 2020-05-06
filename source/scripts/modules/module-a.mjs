import { delay } from './delay.mjs';

const msg = text => `Async: ${text}`;

export async function asyncMessage(text, el = document.querySelector('main')) {
	const p = document.createElement('p');

	p.textContent = 'Loading...';

	el.appendChild(p);

	await delay(2500);

	p.textContent = msg(text);

	return p;
}
