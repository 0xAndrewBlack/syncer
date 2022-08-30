import logger from '../../utils/logger.js';
import { config } from '../../config.js';

import type { RouterContext } from '@koa/router';
import { Get, Middleware, Router } from '@discordx/koa';

import { Log } from '../middlewares/Log.middleware.js';
import { Authenticated } from '../middlewares/Auth.middleware.js';

@Router()
@Middleware(Log)
export class Index {
	@Get('/')
	hello(ctx: RouterContext): void {
		ctx.body = {
			message: 'Hello',
		};
	}
	@Get('/auth')
	@Middleware(Authenticated)
	auth(ctx: RouterContext): void {
		ctx.body = 'Hello auth user!';
	}
}
