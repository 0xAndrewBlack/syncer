import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { Discord, Guard, Slash, SlashOption } from 'discordx';
import { Description, PermissionGuard } from '@discordx/utilities';

import { stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { IsThread } from '../guards/IsThread.Guard.js';
import { APIError, GitHubError } from '../../interfaces/errorFactory.js';

@Discord()
@Guard(IsThread)
export class UpdateLabel {
	@Slash({ name: 'label' })
	@Guard(PermissionGuard(['SendMessages']))
	@Description('Appends label(s), delimit by comma dont add spaces between.')
	async changePriority(
		@SlashOption({ name: 'label', description: 'Issue label', required: true })
		label: string,
		interaction: CommandInteraction
	): Promise<void> {
		try {
			const labelEmbed = new EmbedBuilder()
				.setColor(config.DC_COLORS.SUCCESS)
				.setTitle(`🏷️ Label(s) set to \`${label}\` successfully.`);

			// @ts-ignore - Interaction name broken it exists but throws error
			const channelName = stripStatusFromThread(interaction.channel?.name);

			await gh.init();

			// @ts-ignore
			await gh.editIssueLabel(channelName, [...label.split(',')], true);
			logger.verbose(
				// @ts-ignore
				`SYNCER > Label [${label}], appended to [${channelName}] issue.`
			);
			await interaction.reply({
				ephemeral: true,
				embeds: [labelEmbed],
			});
		} catch (error: Error | any) {
			throw new APIError(error.message);
		}
	}
}
