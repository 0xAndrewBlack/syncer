import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import type { NextFunction, Request, Response } from 'express';
import { Controller, Middleware, Get, Post, Put, Delete, ClassMiddleware } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';

import { authHandler } from '../middlewares/Auth.Middleware.js';

@Controller('')
@ClassMiddleware(authHandler)
export class IndexController {
	@Get()
	async get(req: Request, res: Response, next: NextFunction) {
		return res.status(StatusCodes.OK).json({
			message: '👋',
		});
	}
}
