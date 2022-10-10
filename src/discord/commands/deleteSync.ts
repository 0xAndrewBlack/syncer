import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { Discord, Guard, Slash } from 'discordx';
import { PermissionGuard } from '@discordx/utilities';

import { stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { IsThread } from '../guards/IsThread.Guard.js';
import { APIError } from '../../interfaces/errorFactory.js';
import { UptimeService } from '../../services/uptimeService.js';

@Discord()
@Guard(IsThread)
export class DeleteSync {
	@Slash({
		name: 'purge',
		description: 'Deletes sync, issue and thread will be marked as deleted (Cant delete through the API).',
	})
	@Guard(PermissionGuard(['SendMessages']))
	async deleteSync(interaction: CommandInteraction): Promise<void> {
		try {
			// @ts-ignore - Interaction name broken it exists but throws error
			const channelName = stripStatusFromThread(interaction.channel?.name);

			await gh.init();

			const labelEmbed = new EmbedBuilder()
				.setColor(config.DC_COLORS.SUCCESS)
				// @ts-ignore
				.setTitle(`🚮 Sync \`${channelName}\` deleted successfully.`)
				.setDescription("Deletion is not possible though the API, it's just for the looks.");

			// @ts-ignore
			// await gh.deleteIssue(interaction.channel.name);
			// @ts-ignore
			logger.verbose(`SYNCER > Sync Purged [${channelName}] thread/issue.`);
			// @ts-ignore
			await interaction.channel.setName(`🚮 - ${channelName}`);
			await interaction.reply({
				ephemeral: true,
				embeds: [labelEmbed],
			});
			UptimeService.removeChannel(interaction.channel);
			// @ts-ignore
			interaction.channel.setLocked(true);
			// @ts-ignore
			interaction.channel.setArchived(true);
			// .then((data) => {
			// 	data.interaction.channel?.delete();
			// });
		} catch (error: Error | any) {
			throw new APIError(error.message);
		}
	}
}
