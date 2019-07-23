const {userInfo} = require('os');
const questions = require('../src/questions');

describe('questions test suite', () => {
	it('\'all\' contains both questions', () => {
		expect(questions.all).toStrictEqual([].concat(questions.usernameQuestion, questions.tokenQuestion));
	});

	it('\'username\' defaults to the current user\'s username', () => {
		expect(questions.usernameQuestion.default).toStrictEqual(userInfo().username);
	});
});
