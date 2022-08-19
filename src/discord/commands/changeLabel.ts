import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { CommandInteraction, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Discord, Guard, Slash, SlashOption } from 'discordx';
import { Description } from '@discordx/utilities';

import { stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { NotThread } from '../guards/NotThread.Guard.js';

@Discord()
@Guard(NotThread)
export class UpdateLabel {
	@Slash({ name: 'label', defaultMemberPermissions: PermissionFlagsBits.SendMessages })
	@Description('Sets label.')
	async changePriority(
		@SlashOption({ name: 'label', description: 'Issue label', required: true })
		label: string,
		interaction: CommandInteraction
	): Promise<void> {
		try {
			const labelEmbed = new EmbedBuilder()
				.setColor('#3DE14E')
				.setTitle(`🏷️ Label(s) set to \`${label}\` successfully.`);

			await gh.init();

			// @ts-ignore
			await gh.editIssueLabel(stripStatusFromThread(interaction.channel.name), [...label.split(',')], true);

			await interaction.reply({
				ephemeral: true,
				embeds: [labelEmbed],
			});
		} catch (error: unknown) {
			throw error;
		}
	}
}
