import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { CommandInteraction, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Description } from '@discordx/utilities';
import { Client, Discord, Guard, Slash } from 'discordx';

import { gh } from '../../services/githubService.js';

import { IsThread } from '../guards/IsThread.Guard.js';
import { IsIssue } from '../guards/IsIssue.Guard.js';

@Discord()
@Guard(IsThread, IsIssue)
export class IssueStatus {
	@Slash({ name: 'info', defaultMemberPermissions: PermissionFlagsBits.SendMessages })
	@Description(`Gets info about the current thrread's GitHub issue.`)
	async info(interaction: CommandInteraction, client: Client, guardData: { issue: any; project: any }): Promise<void> {
		await gh.init();

		const { number, html_url, body, labels, assignee } = guardData.issue;
		const { status } = guardData.project.fields;

		const statusEmbed = new EmbedBuilder()
			.setTitle('Issue Status')
			.setURL(html_url)
			.setColor('Blurple')
			.setDescription(body)
			.addFields([
				{
					name: 'ID',
					value: `${number}`,
					inline: true,
				},
				{
					name: 'Priority',
					value: `${status}`,
					inline: true,
				},
				{
					name: 'Label(s)',
					value: `\`${labels.map((label: any) => label.name)}\``,
					inline: false,
				},
				{
					name: 'Assignee(s)',
					value: `\`${assignee.login}\``,
					inline: false,
				},
			]);

		await interaction.reply({
			embeds: [statusEmbed],
			ephemeral: false,
		});
	}
}
