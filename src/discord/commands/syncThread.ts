import { config } from '../../config.js';

import { CommandInteraction, EmbedBuilder, PermissionFlagsBits, ThreadAutoArchiveDuration } from 'discord.js';
import { Description } from '@discordx/utilities';
import { Discord, Guard, Slash } from 'discordx';

import { labelsWithEmojis } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';
import { ErrorHandler } from '../guards/ErrorGuard.js';

@Discord()
export class SyncThread {
	@Guard(ErrorHandler)
	@Slash('sync', {
		defaultPermission: false,
		defaultMemberPermissions: PermissionFlagsBits.SendMessages,
	})
	@Description('Syncs thread to a new GitHub issue.')
	async syncThread(interaction: CommandInteraction): Promise<void> {
		// @ts-ignore
		const { name } = interaction.channel;

		if (!interaction.channel?.isThread()) {
			throw new Error(`Channel is not a \`Thread\` channel.`);
		}

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
			.setColor(config.DC_COLORS.EMBED as any)
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
				iconURL: interaction.channel.client.user?.displayAvatarURL(),
			});

		const syncEmbed = new EmbedBuilder()
			.setColor(config.DC_COLORS.SUCCESS as any)
			.setTitle(`🔃 Issue \`${name}\` synced successfully.`);

		interaction.reply({
			ephemeral: true,
			embeds: [issueEmbed, syncEmbed],
		});
	}
}
