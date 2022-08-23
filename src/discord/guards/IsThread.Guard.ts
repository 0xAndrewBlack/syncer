import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import type { Client, GuardFunction, Next } from 'discordx';
import { CommandInteraction } from 'discord.js';
import { UserError } from '../../interfaces/errorFactory.js';

export const IsThread: GuardFunction<CommandInteraction> = async (
	interaction: CommandInteraction,
	client: Client,
	next: Next
) => {
	const isThread = interaction.channel?.isThread();

	if (!isThread) {
		throw new UserError(`Channel is not a \`Thread\` channel.`);
	}

	await next();
};
