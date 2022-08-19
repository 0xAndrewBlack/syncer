import { config } from '../../config.js';

import type { Client, GuardFunction, Next } from 'discordx';
import { CommandInteraction } from 'discord.js';

export const NotThread: GuardFunction<CommandInteraction> = async (
	interaction: CommandInteraction,
	client: Client,
	next: Next
) => {
	const isThread = interaction.channel?.isThread();

	if (!isThread) {
		throw new Error(`Channel is not a \`Thread\` channel.`);
	}

	await next();
};
