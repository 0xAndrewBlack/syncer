import { ArgsOf, Discord, On, RestArgsOf } from 'discordx';

import { config } from '../../config.js';
import logger from '../../utils/logger.js';

@Discord()
export class RateLimitHandler {
	@On.rest({ event: 'rateLimited' })
	private async rateLimited([rateLimitData]: RestArgsOf<'rateLimited'>): Promise<void> {
		const { limit, url, hash, majorParameter, method, route, timeToReset, global } = rateLimitData;
		logger.warn({
			limit,
			url,
			hash,
			majorParameter,
			method,
			route,
			timeToReset,
			global,
		});
	}
}
