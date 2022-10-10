import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from 'discord.js';
import { Discord, Guard, Slash, SlashChoice, SlashOption } from 'discordx';
import { PermissionGuard } from '@discordx/utilities';

import { Stories, stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { IsThread } from '../guards/IsThread.Guard.js';
import { APIError, GitHubError } from '../../interfaces/errorFactory.js';

@Discord()
@Guard(IsThread)
export class EditStory {
	@Slash({ name: 'story', description: 'Changes story' })
	@Guard(PermissionGuard(['SendMessages']))
	async editStory(
		@SlashChoice(...Stories)
		@SlashOption({
			name: 'story',
			type: ApplicationCommandOptionType.String,
			description: 'Issue related to a story',
			required: true,
		})
		story: string,
		interaction: CommandInteraction
	): Promise<void> {
		interaction.deferReply();

		try {
			// @ts-ignore - Interaction name broken it exists but throws error
			const channelName = stripStatusFromThread(interaction.channel?.name);

			await gh.init();

			// @ts-ignore - Interaction name broken it exists but throws error
			await gh.setStory(stripStatusFromThread(interaction.channel.name), story);

			const storyEmbed = new EmbedBuilder()
				.setColor(config.DC_COLORS.SUCCESS)
				.setTitle(`👄 Story updated to \`${story}\` successfully.`);

			// @ts-ignore
			logger.verbose(`SYNCER > Story [${story}], changed on [${channelName}] issue.`);

			await interaction.reply({
				embeds: [storyEmbed],
				ephemeral: true,
			});
		} catch (error: Error | any) {
			logger.error(JSON.stringify(error));
			throw new APIError(error.message);
		}
	}
}
