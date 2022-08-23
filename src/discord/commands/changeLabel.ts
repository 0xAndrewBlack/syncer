import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { ColorResolvable, CommandInteraction, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Discord, Guard, Slash, SlashOption } from 'discordx';
import { Description } from '@discordx/utilities';

import { stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { IsThread } from '../guards/IsThread.Guard.js';

@Discord()
@Guard(IsThread)
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
				.setColor(config.DC_COLORS.SUCCESS as ColorResolvable)
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
