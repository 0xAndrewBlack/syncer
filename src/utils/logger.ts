import { createLogger, format, LogEntry, transports } from 'winston';

const { printf, combine, colorize, timestamp, errors } = format;

const devLogFormat = printf((log) => {
	let msg = `${log.timestamp} ${log.level} ${log.message}`;
	if (log.meta) {
		const metaToLog = { ...log.meta };
		Object.keys(metaToLog).forEach((k) => {
			if (metaToLog[k]?.length > 100 || (k === 'accesses' && metaToLog.accesses[0]?.users?.length > 100)) {
				metaToLog[k] = 'data hidden';
			}
		});
		msg += ` - ${JSON.stringify(metaToLog)}`;
	}
	if (log.stack) {
		msg += log.stack;
	}
	return msg;
});

const logger = createLogger({
	level: 'debug',
	format: combine(
		timestamp({ format: 'DD-MM-YYYY hh:mm:ss A' }),
		format((logLevel: LogEntry) => {
			logLevel.level = logLevel.level.toUpperCase();

			return logLevel;
		})(),
		errors({ stack: true }),
		colorize(),
		devLogFormat
	),
	transports: [
		new transports.Console({ level: 'debug' }),
		new transports.File({ filename: 'logs/combined.log', level: 'debug' }),
	],
});

export default logger;
