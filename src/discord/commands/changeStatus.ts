import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from 'discord.js';
import { Discord, Guard, Slash, SlashChoice, SlashOption } from 'discordx';
import { PermissionGuard } from '@discordx/utilities';

import { Status, labelsWithEmojis, stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';
import limiters from '../../utils/limiters.js';
import { IsThread } from '../guards/IsThread.Guard.js';
import { UptimeService } from '../../services/uptimeService.js';

@Discord()
@Guard(IsThread)
export class ChangeStatus {
	@Slash({ name: 'status', description: 'Sets status, on Done the thread will close.' })
	@Guard(PermissionGuard(['SendMessages']))
	async changePriority(
		@SlashChoice(...Status)
		@SlashOption({
			name: 'status',
			type: ApplicationCommandOptionType.String,
			description: 'Issue status',
			required: true,
		})
		status: string,
		interaction: CommandInteraction
	): Promise<void> {
		// @ts-ignore
		const issueName = stripStatusFromThread(interaction.channel.name);

		gh.init();

		logger.verbose(`SYNCER > Status changed to [${status}], on [${issueName}] issue.`);

		const statusEmbed = new EmbedBuilder()
			.setColor(config.DC_COLORS.SUCCESS)
			.setTitle(`🧪 Status updated to \`${status}\` successfully.`);

		await interaction.reply({
			embeds: [statusEmbed],
			ephemeral: true,
		});

		// @ts-ignore
		await gh.editIssueLabel(issueName, [status], false);

		const statusEmoji = labelsWithEmojis.find((labels) => labels.label === status)?.emoji;

		if (status === 'Done') {
			limiters.channelNameLimiter.schedule(async () => {
				// @ts-ignore
				await interaction.channel.setName(`${statusEmoji} - ${issueName}`);
				// @ts-ignore
				await interaction.channel?.setArchived(true);
			});
			UptimeService.removeChannel(interaction.channel);

			return;
		}

		// @ts-ignore
		if (String(interaction.channel.name).startsWith('🚩')) {
			return;
		}

		limiters.channelNameLimiter.schedule(async () => {
			// @ts-ignore
			await interaction.channel.setName(`${statusEmoji} - ${issueName}`);
		});

		return;
	}
}
