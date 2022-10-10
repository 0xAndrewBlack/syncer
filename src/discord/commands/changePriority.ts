import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from 'discord.js';
import { Discord, Guard, Slash, SlashChoice, SlashOption } from 'discordx';
import { PermissionGuard } from '@discordx/utilities';

import { Priorities, stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { IsThread } from '../guards/IsThread.Guard.js';
import { APIError } from '../../interfaces/errorFactory.js';

@Discord()
@Guard(IsThread)
export class ChangePriority {
	@Slash({ name: 'priority', description: 'Sets priority' })
	@Guard(PermissionGuard(['SendMessages']))
	async changePriority(
		@SlashChoice(...Priorities)
		@SlashOption({
			name: 'priority',
			type: ApplicationCommandOptionType.String,
			description: 'Issue priority',
			required: true,
		})
		prio: string,
		interaction: CommandInteraction
	): Promise<void> {
		try {
			// @ts-ignore
			const channelName = stripStatusFromThread(interaction.channel.name);

			gh.init();

			// @ts-ignore - Interaction name broken it exists but throws error
			gh.setPriority(stripStatusFromThread(interaction.channel.name), prio);

			const priorityEmbed = new EmbedBuilder()
				.setColor(config.DC_COLORS.SUCCESS)
				.setTitle(`💈 Priority updated to \`${prio}\` successfully.`);

			// @ts-ignore
			logger.verbose(`SYNCER > Priority [${prio}], changed on [${channelName}] issue.`);

			if (prio == 'Critical') {
				// @ts-ignore
				interaction.channel.setName(`🚩 - ${channelName}`);
			}

			await interaction.reply({
				embeds: [priorityEmbed],
				ephemeral: true,
			});
		} catch (error: Error | any) {
			throw new APIError(error.message);
		}
	}
}
