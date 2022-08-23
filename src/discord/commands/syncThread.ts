import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import {
	ColorResolvable,
	CommandInteraction,
	EmbedBuilder,
	PermissionFlagsBits,
	ThreadAutoArchiveDuration,
} from 'discord.js';
import { Description } from '@discordx/utilities';
import { Discord, Guard, Slash } from 'discordx';

import { labelsWithEmojis } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { IsThread } from '../guards/IsThread.Guard.js';
import { IsIssueLinked } from '../guards/IsIssueLinked.Guard.js';

@Discord()
@Guard(IsThread, IsIssueLinked)
export class SyncThread {
	@Slash({ name: 'sync', defaultMemberPermissions: PermissionFlagsBits.SendMessages })
	@Description('Syncs thread to a new GitHub issue.')
	async syncThread(interaction: CommandInteraction): Promise<void> {
		// @ts-ignore
		const { name } = interaction.channel;

		let issueEmbed: any;
		let issueObj: any = {};

		try {
			// @ts-ignore
			interaction.channel?.setAutoArchiveDuration(ThreadAutoArchiveDuration.OneWeek);

			gh.init();
			const { data } = await gh.createIssue(name, name, ['Backlog']);
			const status = labelsWithEmojis.find((label) => label.label === 'Backlog')?.emoji;
			// @ts-ignore
			interaction.channel.setName(`${status} - ${name}`);

			issueObj.id = data.number;
			issueObj.status = data.labels[0];
			issueObj.issueLink = data.html_url;
		} catch (error: unknown) {
			throw error;
		}

		issueEmbed = new EmbedBuilder()
			.setColor(config.DC_COLORS.EMBED as ColorResolvable)
			.setTitle(name)
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

		logger.verbose('🧵 Thread synced.');

		const syncEmbed = new EmbedBuilder()
			.setColor(config.DC_COLORS.SUCCESS as ColorResolvable)
			.setTitle(`🔃 Issue \`${name}\` synced successfully.`);

		interaction.reply({
			ephemeral: true,
			embeds: [issueEmbed, syncEmbed],
		});
	}
}
