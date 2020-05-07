// import HelloWorldServices from './hello-world.service';

// describe('Hello World Services', () => {
// 	let api;
// 	let service;

// 	beforeEach(async () => {
// 		api = {
// 			post: jest.fn(),
// 		};

// 		service = new AccountsService(api);
// 	});

// 	describe('tfa', () => {
// 		test('Two factor authentication should set isValidated to true', async () => {
// 			const user = {
// 				privateBankerUserId: 'j0hnd03',
// 				isValidated: false,
// 			};

// 			await service.tfa('6TtU8H', user);

// 			expect(user.isValidated).toBe(true);
// 		});
// 	});
// });
