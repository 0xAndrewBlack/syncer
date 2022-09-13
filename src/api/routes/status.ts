import { StatusCodes } from 'http-status-codes';
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import type { NextFunction, Request, Response } from 'express';

import { BotService } from '../services/Bot.Service.js';
import pretty from 'pretty-ms';
import { API_VERSION, BOT_VERSION } from '../helpers/helpers.js';

@Controller('status')
export class StatusController {
	@Get()
	async getStatus(req: Request, res: Response, next: NextFunction) {
		const botUptime = await BotService.getBotUptime();

		return res.status(StatusCodes.OK).json({
			message: {
				api: {
					version: API_VERSION,
					uptime: pretty(process.uptime() * 1000),
				},
				bot: {
					version: BOT_VERSION,
					uptime: pretty(botUptime),
				},
				server: {
					version: process.version,
					uptime: pretty(process.uptime() * 1000),
					currentDate: new Date().toLocaleDateString(),
				},
			},
		});
	}
}
