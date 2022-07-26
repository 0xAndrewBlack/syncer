import { config } from '../config.js';
import logger from '../utils/logger.js';

import { ThreadAutoArchiveDuration } from 'discord.js';
import { CronJob } from 'cron';
import { PrismaClient } from '@prisma/client';
import { DiscordBot } from '../index.js';

import limiters from '../utils/limiters.js';

const prisma = new PrismaClient();

// Store discord thread channels to later ping them in order to keep them persistent
export abstract class UptimeService {
	public static channelsToPing: Map<string, boolean> = new Map();
	public static channelQueue: CronJob;

	public static async init(): Promise<void> {
		const fetchedChannels =
			(await prisma.threads.findMany({
				where: {
					ping: true,
				},
				select: {
					id: true,
					guild_id: true,
					status: true,
				},
			})) || [];

		fetchedChannels.forEach(({ id, guild_id, status }) => {
			this.addChannel({ id, guild_id, status });
		});

		this.channelQueue = new CronJob(config.DC_PING_PATTERN, async () => {
			logger.verbose(`PINGER > Pinging ${this.channelsToPing.size} channels...`);

			if (this.channelsToPing.size === 0) {
				logger.info(`PINGER > No channels to ping!`);

				return;
			}

			this.channelsToPing.forEach(async (value, key) => {
				if (!value) return;

				await this.pingChannel({ id: key });
			});
		});
		this.channelQueue.start();

		logger.info(`PINGER > Initialized channels.`);
	}

	public static async addChannel(channel: any): Promise<void> {
		// logger.info(`PINGER > Adding a channel to the ping list...`);

		const fetchedChannels = await prisma.threads.upsert({
			create: {
				id: channel.id,
				guild_id: channel.guild_id ? channel.guild_id : channel.guildId,
				added: new Date(),
				status: 'open',
				ping: true,
			},
			update: {
				id: channel.id,
				guild_id: channel.guild_id ? channel.guild_id : channel.guildId,
				added: channel.added,
				status: channel.status,
				ping: channel.ping,
			},
			where: {
				id: channel.id,
			},
		});

		const { id, status, ping } = fetchedChannels;

		this.channelsToPing.set(id, ping);
	}

	public static async removeChannel(channel: any): Promise<void> {
		const fetchedChannel = await prisma.threads.findUnique({
			where: {
				id: channel.id,
			},
			select: {
				id: true,
				guild_id: true,
				ping: true,
				status: true,
			},
		});

		if (!fetchedChannel) return;

		if (!this.channelsToPing.has(fetchedChannel.id)) {
			logger.info(`PINGER > Channel [${fetchedChannel.id}] is not in the ping list!`);

			return;
		}

		await prisma.threads.update({
			data: {
				ping: false,
				status: 'closed',
			},
			where: {
				id: fetchedChannel.id,
			},
		});

		this.channelsToPing.delete(channel.id);

		logger.info(`PINGER > Removed a channel from the ping list...`);
	}

	public static async pingChannel(channel: any): Promise<void> {
		const channelToPing = await DiscordBot.bot.channels
			.fetch(channel.id)
			.then((d) => {
				if (config.NODE_ENV !== 'production') {
					// @ts-ignore
					logger.debug(`PINGER > Pinging channel [${d?.name}]...`);
				}

				return d;
			})
			.catch((error) => {
				logger.error(`PINGER > [${error}] - Channel [${channel.id}] possibly deleted?`);

				// this.removeChannel(channel);
			});

		if (!channelToPing) return;

		if (!channelToPing.isThread()) {
			logger.error('PINGER > Channel is not a thread!');

			UptimeService.removeChannel(channel);

			return;
		}

		if (!(await UptimeService.statusIsDone(channel))) {
			UptimeService.removeChannel(channel);

			return;
		}

		try {
			limiters.pingLimiter.schedule(async () => {
				await channelToPing.setArchived(false);
				await channelToPing.setAutoArchiveDuration(ThreadAutoArchiveDuration.OneWeek);
			});
		} catch (e: any) {
			logger.error(`PINGER > Error while pinging channel [${channel.id}]: ${e.message}`);
		}
	}

	public static async statusIsDone(channel: any): Promise<boolean> {
		const fetchedChannel = await prisma.threads.findUnique({
			where: {
				id: channel.id,
			},
		});

		if (!fetchedChannel) return false;

		return fetchedChannel.status.includes('open');
	}
}

UptimeService.init();
