import { ArgsOf, Discord, On } from 'discordx';

import { config } from '../../config.js';
import logger from '../../utils/logger.js';

@Discord()
export class ShardHandler {
	@On({ event: 'shardReady' })
	async shardReady([shard]: ArgsOf<'shardReady'>): Promise<void> {
		logger.info(shard);
	}
	@On({ event: 'shardError' })
	async shardError([shard]: ArgsOf<'shardError'>): Promise<void> {
		logger.error(shard);
	}
	@On({ event: 'shardDisconnect' })
	async shardDisconnect([shard]: ArgsOf<'shardDisconnect'>): Promise<void> {
		logger.warn(shard);
	}
	@On({ event: 'shardReconnecting' })
	async shardReconnect([shard]: ArgsOf<'shardReconnecting'>): Promise<void> {
		logger.verbose(shard);
	}
	@On({ event: 'shardResume' })
	async shardResume([shard]: ArgsOf<'shardResume'>): Promise<void> {
		logger.warn(shard);
	}
}
