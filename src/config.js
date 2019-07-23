const { join } = require('path');

const envPaths = require('env-paths');
const makeDir = require('make-dir');

const { isNullOrUndefined } = require('./utils');

class Config {
	constructor(logger, fs = require('fs')) {
		this.logger = logger;
		this.fs = fs;
		this.configPath = envPaths('github-forks-setup').config;
		this.configFilePath = join(this.configPath, 'config.json');

		// If the config file exists, this function loads it (read + parse), otherwise this keeps it null.
		try {
			const configFileContent = this.fs.readFileSync(this.configFilePath, { encoding: 'utf8' });
			this.logger.debug(`'config.json' file found with content ${configFileContent}`);
			this.fileConfig = JSON.parse(configFileContent);
		} catch (error) {
			// Ignore this error and don't do anything else
			this.logger.debug(`Config file loading failed. Error msg: ${error.message}`);
		}
	}

	get githubUsername() {
		return this.fileConfig && this.fileConfig.githubUsername || undefined;
	}

	set githubUsername(username) {
		// Input validation
		if (isNullOrUndefined(username)) {
			throw new TypeError('The GitHub username is required.');
		}

		if (typeof username !== 'string') {
			throw new TypeError('The GitHub username must be of type \'string\'.');
		}

		if (username.trim().length === 0) {
			throw new Error('The GitHub username cannot be a string containing only whitespaces.');
		}

		// Using the existing config (if present), override the GitHub username
		this.fileConfig = {
			...this.fileConfig,
			githubUsername: username
		};
	}

	get githubToken() {
		return this.fileConfig && this.fileConfig.githubToken || undefined;
	}

	set githubToken(githubToken) {
		// Input validation
		if (isNullOrUndefined(githubToken)) {
			throw new TypeError('The GitHub token is required.');
		}

		if (typeof githubToken !== 'string') {
			throw new TypeError('The GitHub token must be of type \'string\'.');
		}

		if (githubToken.trim().length === 0) {
			throw new Error('The GitHub token cannot be a string containing only whitespaces.');
		}

		// Using the existing config (if present), override the GitHub Token
		this.fileConfig = {
			...this.fileConfig,
			githubToken
		};
	}

	isComplete() {
		return !isNullOrUndefined(this.githubToken) && !isNullOrUndefined(this.githubUsername);
	}

	save() {
		this.logger.debug(`Writing attempt to ${this.configFilePath} with content ${this.fileConfig}`);
		makeDir.sync(this.configPath, {fs: this.fs});
		this.fs.writeFileSync(this.configFilePath, JSON.stringify(this.fileConfig), {encoding: 'utf8'});
	}
}

module.exports = Config;
