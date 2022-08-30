import logger from '../../utils/logger.js';

import type { RouterContext } from '@koa/router';
import type { Next } from 'koa';

export function Log(ctx: RouterContext, next: Next) {
	logger.verbose(`${ctx.method} 100ms - ${ctx.path}`);
	logger.debug(`${ctx.status} ${ctx.response.status} ${ctx.res.statusCode} ${ctx.res.statusMessage}`);

	return next();
}
