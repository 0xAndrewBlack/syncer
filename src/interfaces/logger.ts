import { config } from '../config.js';
import logger from '../utils/logger.js';

import { ILogger } from 'discordx';

export class djxLogger implements ILogger {
	public error(...args: unknown[]): void {
		logger.error(args);
	}

	public info(...args: unknown[]): void {
		logger.info(args);
	}

	public log(...args: unknown[]): void {
		logger.verbose(args);
	}

	public warn(...args: unknown[]): void {
		logger.warn(args);
	}
}
