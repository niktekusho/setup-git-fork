#!/usr/bin/env node

const meow = require('meow');
const meowShortcuts = require('meow-shorts');

const app = require('..');

const cli = meow(`
	Usage:
	  $ setup-git-fork …
`);

meowShortcuts(cli);

app(cli.input, cli.flags)
	.then(() => {
		console.log('Function exited correctly!');
	}).catch(console.error);
