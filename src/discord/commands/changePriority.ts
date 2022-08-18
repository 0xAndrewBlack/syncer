import { config } from '../../config.js';

import { CommandInteraction, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Discord, Guard, Slash, SlashChoice, SlashOption } from 'discordx';
import { Description } from '@discordx/utilities';

import { Priorities, stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';
import { ErrorHandler } from '../guards/ErrorGuard.js';

@Discord()
export class ChangePriority {
	@Guard(ErrorHandler)
	@Slash('priority', {
		defaultPermission: false,
		defaultMemberPermissions: PermissionFlagsBits.SendMessages,
	})
	@Description('Sets priority.')
	async changePriority(
		@SlashChoice(...Priorities)
		@SlashOption('priority', { description: 'Issue priority', required: true })
		prio: number,
		interaction: CommandInteraction
	): Promise<void> {
		if (!interaction.channel?.isThread()) {
			throw new Error(`Channel is not a \`Thread\` channel.`);
		}

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
