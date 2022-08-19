import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import type { ArgsOf, Client } from 'discordx';
import { Discord, On } from 'discordx';
import { EmbedBuilder, ThreadAutoArchiveDuration } from 'discord.js';

import { stripStatusFromThread } from '../../utils/discord.js';
import { labelsWithEmojis } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

@Discord()
export class ThreadHandler {
	@On({ event: 'threadCreate' })
	async onThreadCreate([thread]: ArgsOf<'threadCreate'>, client: Client): Promise<void> {
		const { name } = thread;

		thread.setAutoArchiveDuration(ThreadAutoArchiveDuration.OneWeek);

		let issueEmbed: any;
		let issueObj: any = {};

		const validChannels = config.CHANNEL_IDS?.split(',');
		const isValidChannel = !validChannels?.includes(thread.parentId as any);
		logger.verbose(config.CHANNEL_IDS);

		if (isValidChannel) {
			logger.verbose(validChannels);
			logger.verbose('⛔ Nem jó csatorna');
			logger.verbose(`🧵 Channel ID: ${thread.parentId}`);

			return;
		}

		logger.verbose(validChannels);
		logger.verbose(`🧵 Channel ID: ${thread.parentId}`);
		logger.verbose('✅ Jó csatorna');

		try {
			gh.init();

			const { data } = await gh.createIssue(name, name, ['Backlog']);
			const status = labelsWithEmojis.find((label) => label.label === 'Backlog')?.emoji;

			thread.setName(`${status} - ${name}`);

			issueObj.id = data.number;
			issueObj.status = data.labels[0];
			issueObj.issueLink = data.html_url;
		} catch (error: unknown) {
			throw error;
		}

		issueEmbed = new EmbedBuilder()
			.setColor('#6D0CE3')
			.setTitle(name)
			.setURL(issueObj.issueLink)
			.setDescription('Issue created.')
			.addFields(
				{
					name: `ID`,
					value: `${issueObj.id}`,
					inline: true,
				},
				{
					name: `Status`,
					value: `${issueObj.status.name}`,
					inline: true,
				}
			)
			.setTimestamp()
			.setFooter({
				text: 'Synced by ZGEN.',
				iconURL: client.user?.displayAvatarURL(),
			});

		thread.send({ embeds: [issueEmbed] });
	}
	@On({ event: 'threadUpdate' })
	async onThreadUpdate([oldThread, newThread]: ArgsOf<'threadUpdate'>, client: Client): Promise<void> {
		const oldName = stripStatusFromThread(oldThread.name);
		const newName = stripStatusFromThread(newThread.name);

		gh.init();

		if (newThread.archived) {
			logger.verbose('THREAD > Archived.');

			gh.toggleIssue(oldName);
			gh.toggleLockIssue(oldName);

			return;
		}

		if (oldThread.archived && !newThread.archived) {
			logger.verbose('THREAD > Unarchived.');

			gh.toggleIssue(newName);
			gh.toggleLockIssue(newName);

			return;
		}

		gh.editIssueWoBody(oldName, newName);
	}
	@On({ event: 'threadDelete' })
	async onThreadDelete([thread]: ArgsOf<'threadDelete'>, client: Client): Promise<void> {
		const { name } = thread;

		logger.verbose('Thread deleted', stripStatusFromThread(name));

		gh.init();

		gh.toggleIssue(name);
		gh.toggleLockIssue(name);
	}
	@On({ event: 'threadListSync' })
	async onThreadSync([threads]: ArgsOf<'threadListSync'>, client: Client): Promise<void> {
		logger.verbose(`${threads.size} thread(s) were synced.`);
	}
}
