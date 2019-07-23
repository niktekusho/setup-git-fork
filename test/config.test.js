const Config = require('../src/config');

const {FSMock, LoggerMock} = require('./testutils');

describe('Config module test', () => {
	const logger = new LoggerMock();

	afterEach(() => {
		logger.reset();
	});

	describe('using mocked fs', () => {
		it('with existing file', () => {
			const fileConfig = {
				githubUsername: 'test',
				githubToken: 'testToken'
			};
			const fs = new FSMock({readFn: () => JSON.stringify(fileConfig)});
			const config = new Config(logger, fs);
			expect(config.fileConfig).toStrictEqual(fileConfig);
			expect(config.githubToken).toStrictEqual('testToken');
			expect(config.githubUsername).toStrictEqual('test');
			expect(config.isComplete()).toStrictEqual(true);
		});

		it('with empty existing file', () => {
			const fs = new FSMock({readFn: () => ''});
			const config = new Config(logger, fs);
			expect(config.fileConfig).toStrictEqual(undefined);
			expect(config.isComplete()).toStrictEqual(false);
		});

		it('without existing file', () => {
			const fs = new FSMock({
				readFn: () => {
					throw new Error('Error');
				}
			});
			const config = new Config(logger, fs);
			expect(config.fileConfig).toStrictEqual(undefined);
			expect(config.githubToken).toStrictEqual(undefined);
			expect(config.githubUsername).toStrictEqual(undefined);

			// No errors logged
			expect(logger.calls.filter(log => log.type === 'error')).toStrictEqual([]);

			// Config load failure is logged in the debug configuration
			expect(logger.calls.filter(log => log.type === 'debug').slice(-1).pop().args).toStrictEqual(['Config file loading failed. Error msg: Error']);
		});

		it('new config save (ok)', () => {
			const fs = new FSMock({
				readFn: () => {
					throw new Error('Error');
				}
			});
			const config = new Config(logger, fs);

			config.githubToken = 'testToken';
			config.githubUsername = 'testUsername';

			const expectedConfig = {
				githubToken: 'testToken',
				githubUsername: 'testUsername'
			};
			expect(config.fileConfig).toStrictEqual(expectedConfig);

			config.save();

			const mkdirCalls = fs.mkdirSyncOperations;

			// Call to mkdir once
			expect(mkdirCalls.length).toStrictEqual(1);

			// Call to writeFile once
			const writeCalls = fs.writeFileSyncOperations;
			expect(writeCalls.length).toStrictEqual(1);

			// Test the written content
			expect(writeCalls[0].args[1]).toStrictEqual(JSON.stringify(expectedConfig));
		});

		it('GitHub token setter with null or undefined', () => {
			const fs = new FSMock({
				readFn: () => {
					throw new Error('Error');
				}
			});

			const config = new Config(logger, fs);
			// This allows to fail the test if the setter does not throw
			let msg = null;
			try {
				config.githubToken = null;
			} catch (error) {
				msg = error.message;
			}
			expect(msg).toStrictEqual('The GitHub token is required.');

			msg = null;

			try {
				config.githubToken = undefined;
			} catch (error) {
				msg = error.message;
			}
			expect(msg).toStrictEqual('The GitHub token is required.');
		});

		it('GitHub token setter with the wrong type', () => {
			const fs = new FSMock({
				readFn: () => {
					throw new Error('Error');
				}
			});

			const config = new Config(logger, fs);
			// This allows to fail the test if the setter does not throw
			let msg = null;
			try {
				config.githubToken = 2;
			} catch (error) {
				msg = error.message;
			}
			expect(msg).toStrictEqual('The GitHub token must be of type \'string\'.');
		});

		it('GitHub token setter with a blank string', () => {
			const fs = new FSMock({
				readFn: () => {
					throw new Error('Error');
				}
			});

			const config = new Config(logger, fs);
			// This allows to fail the test if the setter does not throw
			let msg = null;
			try {
				config.githubToken = '  ';
			} catch (error) {
				msg = error.message;
			}
			expect(msg).toStrictEqual('The GitHub token cannot be a string containing only whitespaces.');
		});

		it('GitHub username setter with null or undefined', () => {
			const fs = new FSMock({
				readFn: () => {
					throw new Error('Error');
				}
			});

			const config = new Config(logger, fs);
			// This allows to fail the test if the setter does not throw
			let msg = null;
			try {
				config.githubUsername = null;
			} catch (error) {
				msg = error.message;
			}
			expect(msg).toStrictEqual('The GitHub username is required.');

			msg = null;

			try {
				config.githubUsername = undefined;
			} catch (error) {
				msg = error.message;
			}
			expect(msg).toStrictEqual('The GitHub username is required.');
		});

		it('GitHub username setter with the wrong type', () => {
			const fs = new FSMock({
				readFn: () => {
					throw new Error('Error');
				}
			});

			const config = new Config(logger, fs);
			// This allows to fail the test if the setter does not throw
			let msg = null;
			try {
				config.githubUsername = 2;
			} catch (error) {
				msg = error.message;
			}
			expect(msg).toStrictEqual('The GitHub username must be of type \'string\'.');
		});

		it('GitHub username setter with a blank string', () => {
			const fs = new FSMock({
				readFn: () => {
					throw new Error('Error');
				}
			});

			const config = new Config(logger, fs);
			// This allows to fail the test if the setter does not throw
			let msg = null;
			try {
				debugger;
				config.githubUsername = '  ';
			} catch (error) {
				msg = error.message;
			}
			expect(msg).toStrictEqual('The GitHub username cannot be a string containing only whitespaces.');
		});

		it('new config save (mkdir Error)', () => {
			const fs = new FSMock({
				readFn: () => {
					throw new Error('Error');
				},
				mkdirFn: () => {
					throw new Error('mkdir error');
				}
			});
			const config = new Config(logger, fs);

			config.githubToken = 'testToken';
			config.githubUsername = 'testUsername';

			const expectedConfig = {
				githubToken: 'testToken',
				githubUsername: 'testUsername'
			};
			expect(config.fileConfig).toStrictEqual(expectedConfig);

			try {
				config.save();
			} catch (error) {
				expect(error.message).toStrictEqual('mkdir error');
			}

			// No calls to writeFile
			expect(fs.writeFileSyncOperations.length).toStrictEqual(0);
		});
	});
});
