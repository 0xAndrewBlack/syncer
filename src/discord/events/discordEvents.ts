import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import type { ArgsOf, RestArgsOf } from 'discordx';
import { Discord, On } from 'discordx';

@Discord()
export class DiscordEventHandler {
	@On.rest({ event: 'rateLimited' })
	async rateLimited([rateLimitData]: RestArgsOf<'rateLimited'>): Promise<void> {
		const { limit, url, hash, majorParameter, method, route, timeToReset, global } = rateLimitData;

		logger.warn(`Rate limited for ${limit} requests to [${url}] - [${route}] - [${hash}]`);
	}
	@On({ event: 'debug' })
	async debug([debugData]: ArgsOf<'debug'>): Promise<void> {
		if (config.NODE_ENV === 'production') return;

		logger.debug(debugData);
	}
	@On({ event: 'error' })
	async error([errorData]: ArgsOf<'error'>): Promise<void> {
		if (config.NODE_ENV === 'production') return;

		logger.error(errorData);
	}
	@On({ event: 'warn' })
	async warn([warnData]: ArgsOf<'warn'>): Promise<void> {
		if (config.NODE_ENV === 'production') return;

		logger.warn(warnData);
	}
}
