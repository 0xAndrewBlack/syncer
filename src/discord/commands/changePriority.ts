import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { Discord, Guard, Slash, SlashChoice, SlashOption } from 'discordx';
import { Description, PermissionGuard } from '@discordx/utilities';

import { Priorities, stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { IsThread } from '../guards/IsThread.Guard.js';
import { APIError, GitHubError } from '../../interfaces/errorFactory.js';

@Discord()
@Guard(IsThread)
export class ChangePriority {
	@Slash({ name: 'priority' })
	@Guard(PermissionGuard(['SendMessages']))
	@Description('Sets priority.')
	async changePriority(
		@SlashChoice(...Priorities)
		@SlashOption({ name: 'priority', description: 'Issue priority', required: true })
		prio: number,
		interaction: CommandInteraction
	): Promise<void> {
		try {
			gh.init();

			// @ts-ignore - Interaction name broken it exists but throws error
			gh.setPriority(stripStatusFromThread(interaction.channel.name), prio);

			const priorityEmbed = new EmbedBuilder()
				.setColor(config.DC_COLORS.SUCCESS)
				.setTitle(`💈 Priority updated to \`${prio}\` successfully.`);
			// @ts-ignore
			logger.verbose(`SYNCER > Priority ${prio}, changed on ${interaction.channel.name} issue.`);
			await interaction.reply({
				embeds: [priorityEmbed],
				ephemeral: true,
			});
		} catch (error: Error | any) {
			throw new APIError(error.message);
		}
	}
}
