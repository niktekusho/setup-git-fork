const {userInfo} = require('os');

const usernameQuestion = {
	type: 'input',
	name: 'username',
	message: 'What is your GitHub\'s username?',
	default: userInfo().username
};

const tokenQuestion = {
	type: 'input',
	name: 'token',
	message: 'What is your GitHub\'s token?',
}

module.exports = {
	tokenQuestion,
	usernameQuestion,
	all: [usernameQuestion, tokenQuestion]
};
