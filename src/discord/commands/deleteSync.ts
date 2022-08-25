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
export class DeleteSync {
	@Slash({ name: 'purge' })
	@Guard(PermissionGuard(['SendMessages']))
	@Description('Deletes sync, issue and thread too.')
	async deleteSync(interaction: CommandInteraction): Promise<void> {
		try {
			const labelEmbed = new EmbedBuilder()
				.setColor(config.DC_COLORS.SUCCESS)
				// @ts-ignore
				.setTitle(`🚮 Sync \`${stripStatusFromThread(interaction.channel.name)}\` deleted successfully.`);

			await gh.init();

			// @ts-ignore
			// await gh.deleteIssue(interaction.channel.name);
			// @ts-ignore
			logger.verbose(`SYNCER > Sync ${stripStatusFromThread(interaction.channel.name)} deleted thread/issue.`);
			// @ts-ignore
			await interaction.channel.setName(`🚮 - ${stripStatusFromThread(interaction.channel.name)}`);
			await interaction.reply({
				ephemeral: true,
				embeds: [labelEmbed],
			});
			// .then((data) => {
			// 	data.interaction.channel?.delete();
			// });
		} catch (error: Error | any) {
			throw new APIError(error.message);
		}
	}
}
