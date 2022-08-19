import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { CommandInteraction, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Discord, Guard, Slash, SlashOption } from 'discordx';
import { Description } from '@discordx/utilities';

import { stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { NotThread } from '../guards/NotThread.Guard.js';

@Discord()
@Guard(NotThread)
export class AddAssignee {
	@Slash({ name: 'assign', defaultMemberPermissions: PermissionFlagsBits.SendMessages })
	@Description('Adds user to the issue.')
	async addAssignee(
		@SlashOption({ name: 'username', description: 'GitHub username', required: true })
		assignee: string,
		interaction: CommandInteraction
	): Promise<void> {
		try {
			const { guildId }: any = interaction;

			// @ts-ignore - Interaction name broken it exists but throws error
			const channelName = stripStatusFromThread(interaction.channel?.name);
			const { repo, owner, projectId } = gh.getData();
			gh.init();
			await gh.populate(guildId, owner, repo, String(projectId));
			await gh.addAssignee(channelName, assignee);

			const assigneeEmbed = new EmbedBuilder()
				.setColor('#3DE14E')
				.setTitle(`🧑 \`${assignee}\` assigned to \`${channelName}\` issue successfully.`);

			await interaction.reply({
				embeds: [assigneeEmbed],
				ephemeral: true,
			});
		} catch (error: unknown) {
			throw error;
		}
	}
}
