import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import type { ArgsOf } from 'discordx';
import { Discord, On } from 'discordx';

@Discord()
export class ShardHandler {
	@On({ event: 'shardReady' })
	async shardReady([shard]: ArgsOf<'shardReady'>): Promise<void> {
		logger.info(`Shard #${shard} is up and ready.`);
	}
	@On({ event: 'shardError' })
	async shardError([shardError]: ArgsOf<'shardError'>): Promise<void> {
		logger.error(`Shard Error encountered Error: [${shardError}].`);
	}
	@On({ event: 'shardDisconnect' })
	async shardDisconnect([shard]: ArgsOf<'shardDisconnect'>): Promise<void> {
		logger.warn(`Shard #${shard} is disconnected.`);
	}
	@On({ event: 'shardReconnecting' })
	async shardReconnect([shard]: ArgsOf<'shardReconnecting'>): Promise<void> {
		logger.warn(`Shard #${shard} is reconnecting.`);
	}
	@On({ event: 'shardResume' })
	async shardResume([shard]: ArgsOf<'shardResume'>): Promise<void> {
		logger.verbose(`Shard #${shard} is resumed.`);
	}
}
