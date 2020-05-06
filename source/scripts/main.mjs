import { asyncMessage } from './modules/module-a.mjs';

export async function main() {
	document
		.querySelector('.js-button')
		.addEventListener('click', async ({ target }) => {
			const { dynamicMessage } = await import('./modules/module-b.mjs');

			dynamicMessage(target);
		});

	// Await is not really needed here...
	await asyncMessage('Hello from the future! 😎');
}
