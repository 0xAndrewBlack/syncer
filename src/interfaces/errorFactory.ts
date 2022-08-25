export class EnvironmentError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'Environment Error';
		this.message = message;
		this.cause = Error(message);
		this.stack = this.cause.stack;

		Error.captureStackTrace(this, this.constructor);
	}
}

export class DevelopmentError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'Development Error';
		this.message = message;
		this.cause = Error(message);
		this.stack = this.cause.stack;

		Error.captureStackTrace(this, this.constructor);
	}
}

export class UserError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'User Error';
		this.message = message;
		this.cause = Error(message);
		this.stack = this.cause.stack;

		Error.captureStackTrace(this, this.constructor);
	}
}

export class DiscordError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'Discord Error';
		this.message = message;
		this.cause = Error(message);
		this.stack = this.cause.stack;

		Error.captureStackTrace(this, this.constructor);
	}
}

export class GitHubError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'GitHub Error';
		this.message = message;
		this.cause = Error(message);
		this.stack = this.cause.stack;

		Error.captureStackTrace(this, this.constructor);
	}
}

export class APIError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'API Error';
		this.message = message;
		this.cause = Error(message);
		this.stack = this.cause.stack;

		Error.captureStackTrace(this, this.constructor);
	}
}
