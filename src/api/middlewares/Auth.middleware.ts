import logger from '../../utils/logger.js';
import { config } from '../../config.js';

import type { RouterContext } from '@koa/router';
import type { Next } from 'koa';

export function Authenticated(ctx: RouterContext, next: Next) {
	if (ctx.headers.authorization === config.API_SECRET) {
		return next();
	}

	ctx.status = 401;
	ctx.body = {
		error: ['Unathorized request.'],
	};

	// ctx.throw(401, ['Unathorized request.']);

	return;
}
