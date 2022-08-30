import logger from '../utils/logger.js';
import { config } from '../config.js';

import { dirname, importx } from '@discordx/importer';
import { Koa } from '@discordx/koa';

import time from 'koa-response-time';
import json from 'koa-json';
import body from 'koa-bodyparser';
import morgan from 'koa-morgan';

export class ServerAPI {
	public static server: Koa;
	public static portNumber: Number;

	public static async start(): Promise<void> {
		this.server = new Koa();

		this.server.use(time());
		this.server.use(json());
		this.server.use(body());
		this.server.use(morgan('dev'));

		await importx(dirname(import.meta.url) + '/routes/**/*.{js,ts}');
		// await importx(__dirname + "/routes/**/*.{js,ts}");
		await this.server.build();

		this.portNumber = config.API_PORT;
		this.server.listen(this.portNumber, () => {
			logger.info(`API running on http://localhost:${this.portNumber}`);
		});
	}
}

ServerAPI.start();
