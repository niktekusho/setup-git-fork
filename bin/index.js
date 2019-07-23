#!/usr/bin/env node

const meow = require('meow');
const meowShortcuts = require('meow-shorts');

const app = require('../src');

const cli = meow(`
	Automate 'clone'ing and 'upstream'ing a git repository fork

	Usage:
	  $ setup-github-fork [github-repository-url]
`);

meowShortcuts(cli);

app(cli.input, cli.flags)
	.then(() => {
		console.log('Function exited correctly!');
	}).catch(console.error);
