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
@Guard(IsThread, IsIssueLinked)
export class SyncThread {
	@Slash({ name: 'sync' })
	@Guard(PermissionGuard(['SendMessages']))
	@Description('Syncs thread to a new GitHub issue.')
	async syncThread(interaction: CommandInteraction): Promise<void> {
		// @ts-ignore
		const { name } = interaction.channel;

		// @ts-ignore - Interaction name broken it exists but throws error
		const channelName = stripStatusFromThread(interaction.channel?.name);

		let label: string = 'backlog';
		let issueEmbed: any;
		let issueObj: any = {};
		let isUrgent = String(name).startsWith('🚩');

		try {
			// @ts-ignore
			interaction.channel?.setAutoArchiveDuration(ThreadAutoArchiveDuration.OneWeek);

			gh.init();

			if (interaction.channel?.isThread()) {
				if (interaction.channel.parentId == config.BUG_CHANNEL) {
					label = 'bug';
				}

				if (interaction.channel.parentId == config.IMP_CHANNEL) {
					label = 'improvement';
				}
			}

			let status = labelsWithEmojis.find((label) => label.label === 'Backlog')?.emoji;
			if (isUrgent) {
				status = '🚩';
				label = 'urgent';
			}

			const body = `👤 Issue created by ${interaction.user.username}#${
				interaction.user.discriminator
			} - Check this [thread on discord](${interaction.channel?.url}) for the whole conversation.\n\n---\n\n${
				isUrgent ? channelName : name
			}`;
			const { data } = await gh.createIssue(isUrgent ? channelName : name, body, [label]);

			// @ts-ignore
			interaction.channel.setName(`${status} - ${isUrgent ? channelName : name}`);

			issueObj.id = data.number;
			issueObj.status = data.labels[0];
			issueObj.issueLink = data.html_url;
		} catch (error: Error | any) {
			throw new APIError(error.message);
		}

		issueEmbed = new EmbedBuilder()
			.setColor(config.DC_COLORS.EMBED)
			.setTitle(isUrgent ? channelName : name)
			.setURL(issueObj.issueLink)
			.setDescription('Issue created.')
			.addFields(
				{
					name: `ID`,
					value: `${issueObj.id}`,
					inline: true,
				},
				{
					name: `Status`,
					value: `${issueObj.status.name}`,
					inline: true,
				}
			)
			.setTimestamp()
			.setFooter({
				text: 'Synced by ZGEN.',
				// @ts-ignore
				iconURL: interaction.channel.client.user?.displayAvatarURL(),
			});

		// @ts-ignore
		logger.verbose(`SYNCER > Thread [${interaction.channel.name}] synced.`);

		const syncEmbed = new EmbedBuilder()
			.setColor(config.DC_COLORS.SUCCESS)
			.setTitle(`🔃 Issue \`${isUrgent ? channelName : name}\` synced successfully.`);

		interaction.reply({
			ephemeral: true,
			embeds: [issueEmbed, syncEmbed],
		});
	}
}
