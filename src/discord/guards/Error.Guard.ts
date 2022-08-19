import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import type { Client, GuardFunction, Next } from 'discordx';
import { CommandInteraction, EmbedBuilder } from 'discord.js';

export const ErrorHandler: GuardFunction<CommandInteraction> = async (
	interaction: CommandInteraction,
	client: Client,
	next: Next
) => {
	try {
		await next();
	} catch (error) {
		if (error instanceof Error) {
			const errorEmbed = new EmbedBuilder()
				.setTitle('⛔ An error occurred.')
				.setDescription(`${error.message}`)
				.setColor('#F03737');

			interaction.reply({
				ephemeral: true,
				embeds: [errorEmbed],
			});

			logger.warn(`${interaction.guild?.name} thrown ${error.name} error.`);
		} else {
			const errorEmbed = new EmbedBuilder()
				.setTitle('❌ An error occurred.')
				.setDescription(`\`${JSON.stringify(error)}\``)
				.setColor('#F03737');

			interaction.reply({
				ephemeral: true,
				embeds: [errorEmbed],
			});

			logger.error(`${interaction.guild?.name} thrown ${JSON.stringify(error)} error.`);
		}
	}
};
