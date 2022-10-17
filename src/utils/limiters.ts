import Bottleneck from 'bottleneck';
import { config } from '../config.js';
import logger from './logger.js';

const pingLimiter = new Bottleneck({
	reservoir: 10,
	minTime: 1000,
	maxConcurrent: 1,
	reservoirRefreshAmount: 10,
	reservoirRefreshInterval: 10 * 1000,
});

pingLimiter.on('depleted', () => {
	const queued = pingLimiter.queued();

	logger.warn(`PINGER > pingLimiter depleted, queued requests: [${JSON.stringify(queued)}]`);
});

if (config.NODE_ENV !== 'production') {
	pingLimiter.on('received', (tokens) => {
		logger.debug(`PINGER > pingLimiter received [${JSON.stringify(tokens)}] tokens`);
	});

	pingLimiter.on('queued', (ms) => {
		logger.debug(`PINGER > pingLimiter queued, waiting [${JSON.stringify(ms)}]ms`);
	});

	pingLimiter.on('message', (message) => {
		logger.debug(`PINGER > pingLimiter message: [${JSON.stringify(message)}]`);
	});

	pingLimiter.on('done', (info) => {
		logger.info(`PINGER > pingLimiter done: [${JSON.stringify(info)}]`);
	});
}

pingLimiter.on('idle', () => {
	logger.verbose(`PINGER > pingLimiter idle, queue emptied jobs done.`);
});

export default pingLimiter;
