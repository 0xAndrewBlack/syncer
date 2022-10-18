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

const channelNameLimiter = new Bottleneck({
	reservoir: 2,
	minTime: 30 * 1000,
	maxConcurrent: 2,
	reservoirRefreshAmount: 1,
	reservoirRefreshInterval: 10 * 1000,
});

pingLimiter.on('depleted', () => {
	const queued = pingLimiter.queued();

	logger.warn(`PINGER > pingLimiter depleted, queued requests: [${JSON.stringify(queued)}]`);
});

channelNameLimiter.on('depleted', () => {
	const queued = channelNameLimiter.queued();

	logger.warn(`SYNCER > channelNameLimiter depleted, queued requests: [${JSON.stringify(queued)}]`);
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

	channelNameLimiter.on('received', (tokens) => {
		logger.debug(`SYNCER > channelNameLimiter received [${JSON.stringify(tokens)}] tokens`);
	});

	channelNameLimiter.on('queued', (ms) => {
		logger.debug(`SYNCER > channelNameLimiter queued, waiting [${JSON.stringify(ms)}]ms`);
	});

	channelNameLimiter.on('message', (message) => {
		logger.debug(`SYNCER > channelNameLimiter message: [${JSON.stringify(message)}]`);
	});

	channelNameLimiter.on('done', (info) => {
		logger.info(`SYNCER > channelNameLimiter done: [${JSON.stringify(info)}]`);
	});
}

pingLimiter.on('idle', () => {
	logger.verbose(`PINGER > pingLimiter idle, queue emptied jobs done.`);
});

channelNameLimiter.on('idle', () => {
	logger.verbose(`SYNCER > channelNameLimiter idle, queue emptied jobs done.`);
});

export default {
	pingLimiter,
	channelNameLimiter,
};
