import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, GuildMember } from 'discord.js';
import { Discord, Guard, Slash, SlashOption } from 'discordx';
import { Description, PermissionGuard } from '@discordx/utilities';

import { stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { IsThread } from '../guards/IsThread.Guard.js';
import { users } from '../../utils/users.js';
import { APIError, GitHubError } from '../../interfaces/errorFactory.js';
import { db } from '../../utils/helpers.js';

@Discord()
@Guard(IsThread)
export class AddAssignee {
	@Slash({ name: 'assign' })
	@Guard(PermissionGuard(['SendMessages']))
	@Description('Adds mentioned user to the issue.')
	async addAssignee(
		@SlashOption({
			name: 'username',
			type: ApplicationCommandOptionType.User,
			description: 'GitHub username',
			required: true,
		})
		mentionedAssignee: GuildMember,
		interaction: CommandInteraction
	): Promise<void> {
		try {
			const { guildId }: any = interaction;
			const assignee = await db.users.findUnique({
				where: {
					user_id: mentionedAssignee.id,
				},
				select: {
					github_handle: true,
					user_name: true,
					discord_handle: true,
					user_id: true,
				},
			});
			// users.find((user) => user.id === mentionedAssignee.id)?.githubHandle || '0xAndrewBlack';

			// @ts-ignore - Interaction name broken it exists but throws error
			const channelName = stripStatusFromThread(interaction.channel?.name);
			const { repo, owner, projectId } = gh.getData();
			gh.init();
			await gh.populate(guildId, owner, repo, String(projectId));
			await gh.addAssignee(channelName, assignee?.github_handle as string);

			const assigneeEmbed = new EmbedBuilder()
				.setColor(config.DC_COLORS.SUCCESS)
				.setTitle(`🧑 \`${assignee?.user_name}\` assigned to \`${channelName}\` issue successfully.`);

			logger.verbose(`SYNCER > Asignee [${assignee?.user_name}], assigned to [${channelName}] issue.`);

			await interaction.reply({
				content: `🧑 <@${assignee?.user_id}> you have been assigned.`,
				// embeds: [assigneeEmbed],
				ephemeral: false,
			});
		} catch (error: Error | any) {
			throw new APIError(error.message);
		}
	}
}
