import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import type { Client, GuardFunction, Next } from 'discordx';
import { CommandInteraction } from 'discord.js';

import { stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';
import { UserError } from '../../interfaces/errorFactory.js';

export const IsIssue: GuardFunction<CommandInteraction> = async (
	interaction: CommandInteraction,
	client: Client,
	next: Next,
	guardData: any
) => {
	gh.init();

	// @ts-ignore
	const channelName = stripStatusFromThread(interaction.channel.name);
	const issue = await gh.isIssueExists(channelName);
	const project = await gh.getCard(channelName);

	if (!issue) {
		throw new UserError(`Issue not linked, use the \`/sync\` command to sync this thread to a new GitHub Issue.`);
	}

	guardData.issue = issue;
	guardData.project = project;

	await next();
};
