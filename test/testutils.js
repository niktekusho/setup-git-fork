class LoggerMock {
	constructor() {
		this.calls = [];
	}

	debug(...args) {
		this.calls.push({
			type: 'debug',
			args
		});
	}

	get debugLogOps() {
		return this.calls.filter(op => op.type === 'debug');
	}

	error(...args) {
		this.calls.push({
			type: 'error',
			args
		});
	}

	get debugLogOps() {
		return this.calls.filter(op => op.type === 'error');
	}

	reset() {
		this.calls = [];
	}
}

function noop() {}

class FSMock {
	constructor({
		mkdirFn = noop,
		readFn = noop,
		writeFn = noop
	} = {}) {
		this.calls = [];

		this.mkdirFn = mkdirFn;
		this.readFn = readFn;
		this.writeFn = writeFn;
	}

	mkdirSync(...args) {
		this.calls.push({
			type: 'mkdirSync',
			args
		});
		return this.mkdirFn(args);
	}

	get mkdirSyncOperations() {
		return this.calls.filter(op => op.type === 'mkdirSync');
	}

	readFileSync(...args) {
		this.calls.push({
			type: 'readFileSync',
			args
		});
		return this.readFn(args);
	}

	get readFileSyncOperations() {
		return this.calls.filter(op => op.type === 'readFileSync');
	}

	writeFileSync(...args) {
		this.calls.push({
			type: 'writeFileSync',
			args
		});
		return this.writeFn(args);
	}

	get writeFileSyncOperations() {
		return this.calls.filter(op => op.type === 'writeFileSync');
	}
}

module.exports = {
	FSMock,
	LoggerMock
};
