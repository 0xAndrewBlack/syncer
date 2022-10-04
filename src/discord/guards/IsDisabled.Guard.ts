import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import type { Client, GuardFunction, Next } from 'discordx';
import { CommandInteraction, EmbedBuilder } from 'discord.js';

export const IsDisabled: GuardFunction<CommandInteraction> = async (
	interaction: CommandInteraction,
	client: Client,
	next: Next
) => {
	const disabledEmbed = new EmbedBuilder()
		.setTitle('⚠️ An error occurred.')
		.setDescription(`Sorry but this command is currently disabled.`)
		.setColor(config.DC_COLORS.WARN);

	interaction.reply({
		ephemeral: true,
		embeds: [disabledEmbed],
	});

	logger.warn(
		`In [${interaction.guild?.name}] guild [${interaction.user.username}] tried to use [${interaction.commandName}] which is disabled.`
	);

	return;
};
