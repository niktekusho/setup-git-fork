#!/usr/bin/env node

const meow = require('meow');
const meowShortcuts = require('meow-shorts');

const app = require('..');

const cli = meow(`
	Automate 'clone'ing and 'upstream'ing a git repository fork

	Usage:
	  $ setup-git-fork --git-username="your-git-username" [git-repository-url]
`, {
	flags: {
		"git-username": {
			alias: 'u',
			type: 'string'
		}
	}
});

meowShortcuts(cli);

app(cli.input, cli.flags)
	.then(() => {
		console.log('Function exited correctly!');
	}).catch(console.error);
