import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import type { Client, GuardFunction, Next } from 'discordx';
import { CommandInteraction } from 'discord.js';

import { stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

export const IsIssueLinked: GuardFunction<CommandInteraction> = async (
	interaction: CommandInteraction,
	client: Client,
	next: Next
) => {
	gh.init();

	// @ts-ignore
	const channelName = stripStatusFromThread(interaction.channel.name);
	const issue = await gh.isIssueExists(channelName);

	if (issue) {
		throw new Error(`Issue is already linked to \`#${issue?.number}\` issue.`);
	}

	await next();
};
