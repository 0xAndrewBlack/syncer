import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import type { ArgsOf, Client } from 'discordx';
import { Guard } from 'discordx';
import { Discord, On } from 'discordx';

import { stripStatusFromThread } from '../../utils/discord';
import { DependaBotCleaner } from '../guards/Dependabot.Guard.js';

@Discord()
export class MessageHandler {
	@On({ event: 'messageCreate' })
	async onMessageCreate([message]: ArgsOf<'messageDelete'>, client: Client): Promise<void> {
		// logger.verbose('Message Sent', client.user?.username, message.content);
		// logger.verbose(stripStatusFromThread(String(message.content)));

		if (message.channelId === config.DB_CHANNEL) {
			logger.debug(message.channelId);
			logger.debug(config.DB_CHANNEL);
			logger.debug(message.channelId === config.DB_CHANNEL);
			logger.debug(message.author?.id === config.DB_ID);
			logger.debug(message.embeds[0].title === 'dependabot[bot]');
			logger.debug(message.embeds[0].title);
			logger.debug(message.embeds);
			if (
				message.embeds.length > 0 &&
				message.author?.id == config.DB_ID &&
				message.embeds[0].title == 'dependabot[bot]'
			) {
				message.delete();
				logger.verbose('MESSAGE > Dependabot fuck off.');
			}
		}
	}
	@On({ event: 'messageDelete' })
	async onMessageDelete([message]: ArgsOf<'messageDelete'>, client: Client): Promise<void> {
		// @ts-ignore
		logger.verbose(`MESSAGE > Deleted in ${message.channel.name}`);
	}
}
