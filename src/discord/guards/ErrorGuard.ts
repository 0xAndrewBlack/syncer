import { CommandInteraction, EmbedBuilder } from 'discord.js';

import { config } from '../../config.js';
import type { GuardFunction } from 'discordx';

export const ErrorHandler: GuardFunction<CommandInteraction> = async (interaction, client, next) => {
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
		} else {
			const errorEmbed = new EmbedBuilder()
				.setTitle('❌ An error occurred.')
				.setDescription(`\`${JSON.stringify(error)}\``)
				.setColor('#F03737');

			interaction.reply({
				ephemeral: true,
				embeds: [errorEmbed],
			});
		}
	}
};
