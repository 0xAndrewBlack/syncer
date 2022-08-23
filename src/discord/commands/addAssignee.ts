import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import {
	ApplicationCommandOptionType,
	ColorResolvable,
	CommandInteraction,
	EmbedBuilder,
	GuildMember,
	PermissionFlagsBits,
} from 'discord.js';
import { Discord, Guard, Slash, SlashOption } from 'discordx';
import { Description } from '@discordx/utilities';

import { stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { IsThread } from '../guards/IsThread.Guard.js';
import { users } from '../../utils/users.js';

@Discord()
@Guard(IsThread)
export class AddAssignee {
	@Slash({ name: 'assign', defaultMemberPermissions: PermissionFlagsBits.SendMessages })
	@Description('Adds user to the issue.')
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
			const assignee = users.find((user) => user.id === mentionedAssignee.id)?.githubHandle || '0xAndrewBlack';

			// @ts-ignore - Interaction name broken it exists but throws error
			const channelName = stripStatusFromThread(interaction.channel?.name);
			const { repo, owner, projectId } = gh.getData();
			gh.init();
			await gh.populate(guildId, owner, repo, String(projectId));
			await gh.addAssignee(channelName, assignee);

			const assigneeEmbed = new EmbedBuilder()
				.setColor(config.DC_COLORS.SUCCESS as ColorResolvable)
				.setTitle(`🧑 \`${assignee}\` assigned to \`${channelName}\` issue successfully.`);

			// WIP
			// interaction.channel?.send(`<@${mentionedAssignee.id}>`);

			await interaction.reply({
				embeds: [assigneeEmbed],
				ephemeral: true,
			});
		} catch (error: unknown) {
			throw error;
		}
	}
}
