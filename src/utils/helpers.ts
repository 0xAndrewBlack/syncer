import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

export function sleep(ms: any) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export const morganProdOptions =
	'":remote-addr/:remote-user" [:date[web]] ' +
	'":method :url HTTP/:http-version" :status ' +
	'":referrer" ":user-agent" :response-time ms';

export const corsOptions = {
	methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
	preflightContinue: true,
	optionsSuccessStatus: 200,
};
