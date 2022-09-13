import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import type { NextFunction, Request, Response } from 'express';
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';

import { ALLOWED_IPS } from '../helpers/helpers.js';

export function authHandler(req: Request, res: Response, next: NextFunction) {
	if (config.NODE_ENV === 'development') {
		return next();
	}

	const key = req.headers.authorization;
	if (!key) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: ['No credentials sent!'] });
	}
	if (key != config.API_SECRET) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ error: ['Wrong credentials sent!'] });
	}

	const ip = req.socket.remoteAddress;
	if (!ALLOWED_IPS.includes(String(ip))) {
		logger.warn(`Unauthorized access from ${ip}`);

		return res.status(StatusCodes.FORBIDDEN).json({ error: ['Requests are not allowed from this IP address!'] });
	}

	next();
}
