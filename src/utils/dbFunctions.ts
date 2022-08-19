// import { config } from '../config.js';
// import logger from './logger.js';

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function isGuildExists(guildId: string): Promise<Boolean> {
// 	const retObj = await prisma.guilds.count({
// 		where: {
// 			guild_id: guildId,
// 		},
// 	});

// 	return Boolean(retObj);
// }

// export async function getGuildInfo(guildId: string): Promise<any> {
// 	return await prisma.guilds.findUnique({
// 		where: {
// 			guild_id: guildId,
// 		},
// 	});
// }

// export async function insertGuildInfo(
// 	guild_id: string,
// 	channel_id: string,
// 	repo_owner: string,
// 	repo_name: string,
// 	project_id: string
// ): Promise<object> {
// 	return await prisma.guilds.create({
// 		data: {
// 			guild_id: guild_id,
// 			channel_id: channel_id,
// 			project_id: project_id,
// 			repo_name: repo_name,
// 			repo_owner: repo_owner,
// 		},
// 	});
// }
