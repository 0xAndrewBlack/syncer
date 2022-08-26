import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { Description, PermissionGuard } from '@discordx/utilities';
import { Client, Discord, Guard, Slash } from 'discordx';

import { getAllDiscordClasses } from '../services/getCommands.js';

@Discord()
export class ShowHelp {
	@Slash({ name: 'help' })
	@Guard(PermissionGuard(['SendMessages']))
	@Description(`Show a small documentation about the available commands.`)
	async info(interaction: CommandInteraction, client: Client): Promise<void> {
		const allCommands = getAllDiscordClasses();
		const commands: any = allCommands
			.filter((command) => {
				// if (['help', 'assign'].includes(command.name)) {
				// 	return false;
				// }
				return true;
			})
			.sort((a, b) => a.name.normalize().localeCompare(b.name.normalize()))
			.map((command) => {
				return { name: `\`/${command.name}\``, value: command.description, inline: true };
			});

		const helpEmbed = new EmbedBuilder()
			.setColor(config.DC_COLORS.EMBED)
			.setTitle('🧸 Help')
			.setDescription(`Here is a list of all the available commands.`)
			.addFields([...commands])
			.setFooter({
				text: 'Sync by ZGEN. For more info mention Lemon#0933',
				iconURL: client.user?.displayAvatarURL(),
			})
			.setTimestamp();

		await interaction.reply({
			embeds: [helpEmbed],
			ephemeral: true,
		});
	}
}
