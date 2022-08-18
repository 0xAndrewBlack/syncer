import { config } from '../../config.js';

import { CommandInteraction, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Discord, Guard, Slash, SlashOption } from 'discordx';
import { Description } from '@discordx/utilities';

import { stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';
import { ErrorHandler } from '../guards/ErrorGuard.js';

@Discord()
export class UpdateLabel {
	@Guard(ErrorHandler)
	@Slash('label', {
		defaultPermission: false,
		defaultMemberPermissions: PermissionFlagsBits.SendMessages,
	})
	@Description('Sets label.')
	async changePriority(
		@SlashOption('label', { description: 'Issue label', required: true })
		label: string,
		interaction: CommandInteraction
	): Promise<void> {
		if (!interaction.channel?.isThread()) {
			throw new Error(`Channel is not a \`Thread\` channel.`);
		}

		try {
			const labelEmbed = new EmbedBuilder()
				.setColor(config.DC_COLORS.SUCCESS as any)
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
