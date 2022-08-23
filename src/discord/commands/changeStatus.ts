import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { ColorResolvable, CommandInteraction, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Discord, Guard, Slash, SlashChoice, SlashOption } from 'discordx';
import { Description } from '@discordx/utilities';

import { Status, labelsWithEmojis, stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { IsThread } from '../guards/IsThread.Guard.js';

@Discord()
@Guard(IsThread)
export class ChangeStatus {
	@Slash({ name: 'status', defaultMemberPermissions: PermissionFlagsBits.SendMessages })
	@Description('Sets status.')
	async changePriority(
		@SlashChoice(...Status)
		@SlashOption({ name: 'label', description: 'Issue label', required: true })
		status: string,
		interaction: CommandInteraction
	): Promise<void> {
		const statusCleaned = status.replace('-', ' ');

		const statusEmbed = new EmbedBuilder()
			.setColor(config.DC_COLORS.SUCCESS as ColorResolvable)
			.setTitle(`🧪 Status updated to \`${statusCleaned}\` successfully.`);

		await interaction.reply({
			embeds: [statusEmbed],
			ephemeral: true,
		});

		gh.init();

		// @ts-ignore
		await gh.editIssueLabel(stripStatusFromThread(interaction.channel.name), [statusCleaned], false);

		const statusEmoji = labelsWithEmojis.find((labels) => labels.label === statusCleaned)?.emoji;

		// @ts-ignore
		await interaction.channel.setName(`${statusEmoji} - ${stripStatusFromThread(interaction.channel.name)}`);

		return;
	}
}
