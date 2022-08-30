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
