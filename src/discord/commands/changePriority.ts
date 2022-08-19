import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { CommandInteraction, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Discord, Guard, Slash, SlashChoice, SlashOption } from 'discordx';
import { Description } from '@discordx/utilities';

import { Priorities, stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { NotThread } from '../guards/NotThread.Guard.js';

@Discord()
@Guard(NotThread)
export class ChangePriority {
	@Slash({ name: 'priority', defaultMemberPermissions: PermissionFlagsBits.SendMessages })
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
				.setColor('#3DE14E')
				.setTitle(`💈 Priority updated to \`${prio}\` successfully.`);

			await interaction.reply({
				embeds: [priorityEmbed],
				ephemeral: true,
			});
		} catch (error: unknown) {
			throw error;
		}
	}
}
