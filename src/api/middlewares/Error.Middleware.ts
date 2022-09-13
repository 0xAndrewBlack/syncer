import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import type { NextFunction, Request, Response } from 'express';
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';

export class ErrorHandler {
	public static notFound = () => {
		return (req: Request, res: Response, next: NextFunction) => {
			res.status(404);

			const error = new Error(`🔍 Not Found - ${req.originalUrl}`);

			next(error);
		};
	};

	public static errorHandler = () => {
		return (err: Error, req: Request, res: Response, next: NextFunction) => {
			const statusCode = res.statusCode !== StatusCodes.OK ? res.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;

			res.status(statusCode).json({
				message: {
					error: {
						message: [err.message],
						stack: config.NODE_ENV === 'production' ? '🥞' : err.stack,
					},
				},
			});
		};
	};
}
