import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import type { Client, GuardFunction, Next } from 'discordx';
import { CommandInteraction, EmbedBuilder } from 'discord.js';

export const IsDevGuard: GuardFunction<CommandInteraction> = async (
	interaction: CommandInteraction,
	client: Client,
	next: Next
) => {
	if (interaction.guildId !== config.DC_DEV_SERVER) {
		const devEmbed = new EmbedBuilder()
			.setTitle('⚠️ An error occurred.')
			.setDescription(`This command is not available in your server.`)
			.setColor(config.DC_COLORS.WARN);

		interaction.reply({
			ephemeral: true,
			embeds: [devEmbed],
		});

		logger.warn(
			`In [${interaction.guild?.name}] guild [${interaction.user.username}] tried to use [${interaction.commandName}] which is a developer command.`
		);

		return;
	}

	await next();
};
