import { asyncMessage } from './module-a.mjs';

export async function dynamicMessage(button) {
	button.textContent = 'Loading...';
	button.disabled = true;

	await asyncMessage(`Hi, I am dynamically loaded from browser: ${window.navigator.userAgent}.`);

	button.textContent = 'Do it again';
	button.disabled = false;
}
