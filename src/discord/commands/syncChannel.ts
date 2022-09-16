// TODO.

// Not in priority, soon™️.

// Concept: create a q and go through all of the threads that are not available on GitHub.

import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { CommandInteraction, EmbedBuilder, ThreadAutoArchiveDuration } from 'discord.js';
import { Description, PermissionGuard } from '@discordx/utilities';
import { Discord, Guard, Slash } from 'discordx';

import { labelsWithEmojis, stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { IsThread } from '../guards/IsThread.Guard.js';
import { IsIssueLinked } from '../guards/IsIssueLinked.Guard.js';
import { APIError, GitHubError } from '../../interfaces/errorFactory.js';

@Discord()
export class SyncChannel {
	@Slash({ name: 'syncthreads' })
	@Guard(PermissionGuard(['SendMessages']))
	@Description('Syncs threads to a new GitHub issues.')
	async syncThread(interaction: CommandInteraction): Promise<void> {
		const soonEmbed = new EmbedBuilder().setTitle('😉 Coming soon!').setColor(config.DC_COLORS.EMBED);

		await interaction.reply({ embeds: [soonEmbed], ephemeral: true });

		logger.verbose(`SYNCER > Sync command used by [${interaction.user.username}].`);
	}
}
