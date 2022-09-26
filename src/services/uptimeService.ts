import { config } from '../config.js';
import logger from '../utils/logger.js';

import { ThreadAutoArchiveDuration } from 'discord.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Store discord thread channels to later ping them in order to keep them persistent
export abstract class UptimeService {
	public static channels: Set<string> = new Set();

	public static async init(): Promise<void> {
		const channels = await prisma.threads.findMany({
			where: {
				ping: false,
			},
		});

		this.channels.add(channels as any);
	}

	public static async addChannel(channel: any): Promise<void> {
		await prisma.threads.create({
			data: {
				id: channel.id,
				channel_name: channel.name,
				added: new Date(),
				status: 'open',
				ping: false,
			},
		});

		this.channels.add(channel);
	}

	public static async removeChannel(channel: any): Promise<void> {
		await prisma.threads.delete({
			where: {
				id: channel.id,
			},
		});

		this.channels.delete(channel);
	}

	public static async pingChannel(client: any, channel: any): Promise<void> {
		client.channels.fetch(channel.id).then(async (t: any) => {
			if (!t.isThread()) {
				logger.error('PINGER > Channel is not a thread!');

				UptimeService.removeChannel(channel);

				return;
			}

			if (await UptimeService.statusIsDone(channel.name)) {
				UptimeService.removeChannel(channel);

				return;
			}

			t.setArchived(false);
			t.setAutoArchiveDuration(ThreadAutoArchiveDuration.OneWeek);

			logger.verbose(`PINGER > Channel [${channel.name}] was pinged to be persistent.`);
		});
	}

	public static async statusIsDone(name: string): Promise<boolean> {
		const channel = await prisma.threads.findFirst({
			where: {
				channel_name: name,
			},
		});

		if (!channel) return false;

		return channel.status.includes('open');
	}
}

UptimeService.init();
