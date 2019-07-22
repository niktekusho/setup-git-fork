#!/usr/bin/env node

const meow = require('meow');
const meowShortcuts = require('meow-shorts');

const app = require('..');

const cli = meow(`
	Automate 'clone'ing and 'upstream'ing a git repository fork

	Usage:
	  $ setup-github-fork --github-username="your-github-username" [github-repository-url]
`, {
	flags: {
		"github-username": {
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
