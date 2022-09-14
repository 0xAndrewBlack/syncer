import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, GuildMember } from 'discord.js';
import { Discord, Guard, Slash, SlashChoice, SlashOption } from 'discordx';
import { Description, PermissionGuard } from '@discordx/utilities';

import { Priorities, Status, Stories, stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { IsThread } from '../guards/IsThread.Guard.js';
import { users } from '../../utils/users.js';
import { APIError, GitHubError, UserError } from '../../interfaces/errorFactory.js';

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
			required: false,
		})
		mentionedAssignee: GuildMember,
		@SlashChoice(...Status)
		@SlashOption({ name: 'status', description: 'Issue status', required: false })
		status: string,
		@SlashChoice(...Priorities)
		@SlashOption({ name: 'priority', description: 'Issue priority', required: false })
		prio: string,
		@SlashOption({ name: 'label', description: 'Issue label', required: false })
		label: string,
		@SlashChoice(...Stories)
		@SlashOption({ name: 'story', description: 'Issue related to a story', required: false })
		story: string,
		interaction: CommandInteraction
	): Promise<void> {
		try {
			if (!(mentionedAssignee || status || prio || label || story)) {
				throw new UserError('You need to provide at least one option.');
			}

			// @ts-ignore - Interaction name broken it exists but throws error
			const channelName = stripStatusFromThread(interaction.channel?.name);

			gh.init();

			if (mentionedAssignee) {
				const assignee = users.find((user) => user.id === mentionedAssignee.id)?.githubHandle || '0xAndrewBlack';

				await gh.addAssignee(channelName, assignee);
			}

			if (status) {
				const statusCleaned = status.replace('-', ' ');

				await gh.editIssueLabel(channelName, [statusCleaned], false);
			}

			if (label) {
				await gh.editIssueLabel(channelName, [...label.split(',')], true);
			}

			if (prio) {
				await gh.setPriority(channelName, prio);
			}

			if (story) {
				await gh.setStory(channelName, story);
			}

			const settingsEmbed = new EmbedBuilder()
				.setColor(config.DC_COLORS.SUCCESS)
				.setTitle(`🙏  \`${stripStatusFromThread(channelName)}\` issue updated successfully.`);

			logger.verbose(`SYNCER > Issue [${stripStatusFromThread(channelName)}] updated.`);

			await interaction.reply({
				embeds: [settingsEmbed],
				ephemeral: true,
			});
		} catch (error: Error | any) {
			if (error instanceof UserError) {
				throw new UserError(error.message);
			}

			throw new APIError(error.message);
		}
	}
}
