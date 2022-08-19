import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import type { ArgsOf, Client } from 'discordx';
import { Discord, On } from 'discordx';

import { stripStatusFromThread } from '../../utils/discord';

@Discord()
export class MessageHandler {
	@On({ event: 'messageCreate' })
	onMessageCreate([message]: ArgsOf<'messageDelete'>, client: Client): void {
		// logger.verbose('Message Sent', client.user?.username, message.content);
		// logger.verbose(stripStatusFromThread(String(message.content)));
	}
	@On({
		event: 'messageDelete',
	})
	onMessageDelete([message]: ArgsOf<'messageDelete'>, client: Client): void {
		logger.verbose('Message Deleted', client.user?.username, message.content);
	}
}
