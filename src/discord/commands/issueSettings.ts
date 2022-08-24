import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, GuildMember } from 'discord.js';
import { Discord, Guard, Slash, SlashChoice, SlashOption } from 'discordx';
import { Description, PermissionGuard } from '@discordx/utilities';

import { Priorities, Status, stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { IsThread } from '../guards/IsThread.Guard.js';
import { users } from '../../utils/users.js';
import { APIError, GitHubError } from '../../interfaces/errorFactory.js';

@Discord()
@Guard(IsThread)
export class IssueSettings {
	@Slash({ name: 'set' })
	@Guard(PermissionGuard(['SendMessages']))
	@Description('Set multiple params to an issue, assign, label and set a status for an issue.')
	async setIssue(
		@SlashOption({
			name: 'username',
			type: ApplicationCommandOptionType.User,
			description: 'GitHub username',
			required: true,
		})
		mentionedAssignee: GuildMember,
		@SlashChoice(...Status)
		@SlashOption({ name: 'status', description: 'Issue status', required: false })
		status: string,
		@SlashChoice(...Priorities)
		@SlashOption({ name: 'priority', description: 'Issue priority', required: false })
		prio: number,
		@SlashOption({ name: 'label', description: 'Issue label', required: false }) label: string,
		interaction: CommandInteraction
	): Promise<void> {
		try {
			const { guildId }: any = interaction;

			const statusCleaned = status.replace('-', ' ');
			const assignee = users.find((user) => user.id === mentionedAssignee.id)?.githubHandle || '0xAndrewBlack';

			// @ts-ignore - Interaction name broken it exists but throws error
			const channelName = stripStatusFromThread(interaction.channel?.name);
			const { repo, owner, projectId } = gh.getData();

			gh.init();
			await gh.populate(guildId, owner, repo, String(projectId));

			if (assignee) {
				await gh.addAssignee(channelName, assignee);
			}

			if (status) {
				// @ts-ignore
				await gh.editIssueLabel(interaction.channel.name, [statusCleaned], false);
			}

			if (label) {
				// @ts-ignore
				await gh.editIssueLabel(stripStatusFromThread(interaction.channel.name), [...label.split(',')], true);
			}

			if (prio) {
				// @ts-ignore - Interaction name broken it exists but throws error
				gh.setPriority(stripStatusFromThread(interaction.channel.name), prio);
			}

			const settingsEmbed = new EmbedBuilder()
				.setColor(config.DC_COLORS.SUCCESS)
				.setTitle(`🙏  \`${channelName}\` issue updated successfully.`);

			logger.verbose(`SYNCER > Issue ${channelName} updated.`);

			await interaction.reply({
				embeds: [settingsEmbed],
				ephemeral: true,
			});
		} catch (error: Error | any) {
			throw new APIError(error.message);
		}
	}
}
