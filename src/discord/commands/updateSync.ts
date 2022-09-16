import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { CommandInteraction, EmbedBuilder, ThreadAutoArchiveDuration } from 'discord.js';
import { Description, PermissionGuard } from '@discordx/utilities';
import { Discord, Guard, Slash } from 'discordx';

import { labelsWithEmojis, stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { IsThread } from '../guards/IsThread.Guard.js';
import { IsIssueLinked } from '../guards/IsIssueLinked.Guard.js';
import { APIError, GitHubError } from '../../interfaces/errorFactory.js';

@Discord()
@Guard(IsThread)
export class UpdateSync {
	@Slash({ name: 'updatesync' })
	@Guard(PermissionGuard(['SendMessages']))
	@Description('Updates sync and issue body to the first message and adds links if not exist.')
	async updateSync(interaction: CommandInteraction): Promise<void> {
		// @ts-ignore
		const { name } = interaction.channel;

		// @ts-ignore - Interaction name broken it exists but throws error
		const channelName = stripStatusFromThread(interaction.channel?.name);

		gh.init();

		try {
			// @ts-ignore
			const starterMessage = await (await interaction.channel?.messages.fetch({ cache: false })).last();

			const issueBody = starterMessage?.content;
			const body = `👤 Issue created by ${interaction.user.username}#${interaction.user.discriminator} - Check this [thread on discord](${interaction.channel?.url}) for the whole conversation.\n\n---\n\n${issueBody}`;

			gh.editIssue(channelName, channelName, body);
		} catch (error: Error | any) {
			throw new APIError(error.message);
		}

		// @ts-ignore
		logger.verbose(`SYNCER > Thread [${interaction.channel.name}] updated body.`);

		const updateEmbed = new EmbedBuilder()
			.setColor(config.DC_COLORS.SUCCESS)
			.setTitle(`🆙 Issue \`${channelName}\` updated successfully.`);

		interaction.reply({
			ephemeral: true,
			embeds: [updateEmbed],
		});
	}
}
