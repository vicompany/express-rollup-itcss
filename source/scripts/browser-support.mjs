// You can extend this test with other DOM/JS API's to narrow support (cutting the mustard).
// Pay attention! Some API's may be polyfilled by Babel/core-js and thus pass the test eg: 'assign' in Object
// We then have to exclude this file from the build.
const isSupported = 'CSS' in window && CSS.supports('display: grid');

const notification = `
	<div class="notification notification--warning">
		Uw browser wordt niet (volledig) ondersteund. Voor een goede ervaring raden wij u aan een moderne browser te gebruiken.
	</div>
`;

export function check(el = document.body) {
	if (isSupported) {
		return;
	}

	el.insertAdjacentHTML('afterbegin', notification);
}
