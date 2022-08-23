export class EnvironmentError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'Environment Error';
		this.message = message;

		Error.captureStackTrace(this, EnvironmentError);
	}
}

export class DevelopmentError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'Development Error';
		this.message = message;

		Error.captureStackTrace(this, DevelopmentError);
	}
}

export class UserError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'User Error';
		this.message = message;

		Error.captureStackTrace(this, UserError);
	}
}

export class DiscordError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'Discord Error';
		this.message = message;

		Error.captureStackTrace(this, DiscordError);
	}
}

export class GitHubError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'GitHub Error';
		this.message = message;

		Error.captureStackTrace(this, GitHubError);
	}
}

export class APIError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'API Error';
		this.message = message;

		Error.captureStackTrace(this, APIError);
	}
}
