const {isNullOrUndefined} = require('../src/utils');

describe('Utils module test', () => {
	describe('\'isNullOrUndefined\' Suite', () => {
		it('\'isNullOrUndefined\' test with empty object', () => {
			expect(isNullOrUndefined({})).toStrictEqual(false);
		});

		it('\'isNullOrUndefined\' test with null object', () => {
			expect(isNullOrUndefined(null)).toStrictEqual(true);
		});

		it('\'isNullOrUndefined\' test with undefined object', () => {
			expect(isNullOrUndefined(undefined)).toStrictEqual(true);
		});
	});
});
