import logger from '../utils/logger.js';
import { config } from '../config.js';

import express from 'express';
import { Server } from '@overnightjs/core';

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { IndexController } from './routes/index.js';
import { StatusController } from './routes/status.js';
import { IssueController } from './routes/api.js';

import { corsOptions, morganProdOptions, morganJSONFormat } from './helpers/helpers.js';
import { ErrorHandler } from './middlewares/Error.Middleware.js';
import { dirname, resolve } from '@discordx/importer';
import { container } from 'tsyringe';

export class IssueServer extends Server {
	public portNumber: Number;
	public routes: string;

	constructor() {
		super(config.NODE_ENV === 'development');

		this.portNumber = config.API_PORT;
		this.routes = `${dirname(import.meta.url)}/controllers/**/*.{ts,js}`;

		this.setup();
	}

	private setup(): void {
		this.app.disable('x-powered-by');

		// this.app.set('turst proxy', 1);
		this.app.set('json spaces', 2);

		this.app.use(cors(corsOptions));
		this.app.use(morgan(morganJSONFormat()));
		this.app.use(helmet({ contentSecurityPolicy: false }));
		this.app.use(cookieParser());
		this.app.use(express.json({ limit: '5mb' }));
		this.app.use(compression());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));

		this.setupControllers();

		this.app.use(ErrorHandler.notFound());
		this.app.use(ErrorHandler.errorHandler());

		this.start();
	}

	private async setupControllers(): Promise<void> {
		const indexController = new IndexController();
		const statusController = new StatusController();
		const issueController = new IssueController();

		super.addControllers([indexController, statusController, issueController]);
	}

	private async start(): Promise<void> {
		this.app.listen(this.portNumber, () => {
			logger.info(`API running on http://localhost:${this.portNumber}`);
		});
	}
}
