import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { PermissionGuard } from '@discordx/utilities';
import { Client, Discord, Guard, Slash } from 'discordx';

import { getAllDiscordClasses } from '../services/getCommands.js';

@Discord()
export class ShowHelp {
	@Slash({ name: 'help', description: 'Show a small documentation about the available commands.' })
	@Guard(PermissionGuard(['SendMessages']))
	async info(interaction: CommandInteraction, client: Client): Promise<void> {
		const allCommands = getAllDiscordClasses();
		const commands: any = allCommands
			.filter((command) => {
				if (['help', 'syncthreads'].includes(command.name)) {
					return false;
				}
				return true;
			})
			.sort((a, b) => a.name.normalize().localeCompare(b.name.normalize()))
			.map((command) => {
				return { name: `\`/${command.name}\``, value: command.description, inline: true };
			});

		logger.verbose(`SYNCER > Help command used by [${interaction.user.username}].`);

		const helpEmbed = new EmbedBuilder()
			.setColor(config.DC_COLORS.EMBED)
			.setTitle('🧸 Help')
			.setDescription(`Here is a list of all the available commands.`)
			.addFields([...commands])
			.setFooter({
				text: 'Syncer by ZGEN. For more info mention Lemon#0933',
				iconURL: client.user?.displayAvatarURL(),
			})
			.setTimestamp();

		await interaction.reply({
			embeds: [helpEmbed],
			ephemeral: true,
		});
	}
}
