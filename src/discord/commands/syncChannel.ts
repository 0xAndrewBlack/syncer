import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { PermissionGuard } from '@discordx/utilities';
import { Discord, Guard, Slash } from 'discordx';

import { IsDisabled } from '../guards/IsDisabled.Guard.js';

@Discord()
@Guard(IsDisabled)
export class SyncChannel {
	@Slash({ name: 'syncthreads', description: 'Sync all threads to new GitHub issues.' })
	@Guard(PermissionGuard(['SendMessages']))
	async syncThread(interaction: CommandInteraction): Promise<void> {
		const soonEmbed = new EmbedBuilder().setTitle('😉 Coming soon!').setColor(config.DC_COLORS.EMBED);

		await interaction.reply({ embeds: [soonEmbed], ephemeral: true });

		logger.verbose(`SYNCER > Sync command used by [${interaction.user.username}].`);
	}
}
