import { StatusCodes } from 'http-status-codes';
import { Controller, Middleware, Get, Post, Put, Delete, ClassMiddleware } from '@overnightjs/core';
import type { NextFunction, Request, Response } from 'express';

import moment from 'moment';
import { BotService } from '../services/Bot.Service.js';
import pretty from 'pretty-ms';
import { API_VERSION, BOT_VERSION } from '../helpers/helpers.js';
import { authHandler } from '../middlewares/Auth.Middleware.js';
import { InfoService } from '../services/Info.Service.js';

@Controller('v1')
@ClassMiddleware(authHandler)
export class IssueController {
	@Get()
	async getStatus(req: Request, res: Response, next: NextFunction) {
		return res.status(StatusCodes.OK).json({
			message: await InfoService.getInfo(),
		});
	}
	@Get('uptime')
	async getInfo(req: Request, res: Response, next: NextFunction) {
		const botUptime = await BotService.getBotUptime();

		return res.status(StatusCodes.OK).json({
			message: {
				api: pretty(process.uptime() * 1000),
				bot: pretty(botUptime),
			},
		});
	}
}
