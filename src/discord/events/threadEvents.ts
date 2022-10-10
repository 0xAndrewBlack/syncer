import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import type { ArgsOf, Client } from 'discordx';
import { Discord, On } from 'discordx';
import { EmbedBuilder, ThreadAutoArchiveDuration } from 'discord.js';

import { stripStatusFromThread } from '../../utils/discord.js';
import { labelsWithEmojis } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';
import { APIError } from '../../interfaces/errorFactory.js';
import { UptimeService } from '../../services/uptimeService.js';

@Discord()
export class ThreadHandler {
	@On({ event: 'threadCreate' })
	async onThreadCreate([thread]: ArgsOf<'threadCreate'>, client: Client): Promise<void> {
		const { name } = thread;

		thread.setAutoArchiveDuration(ThreadAutoArchiveDuration.OneWeek);

		const starterMessage = await thread.messages.fetch({ cache: false, limit: 1 });

		let label: string = '';
		let issueEmbed: any;
		let issueObj: any = {};

		const validChannels = [config.BUG_CHANNEL, config.IMP_CHANNEL];
		const isValidChannel = validChannels?.includes(thread.parentId as any);

		if (!isValidChannel) {
			logger.warn('THREAD > Created in an other channel.');

			return;
		}

		logger.verbose('THREAD > Created successfully.');

		try {
			gh.init();

			if (thread.parentId == config.BUG_CHANNEL) {
				label = 'bug';
			}

			if (thread.parentId == config.IMP_CHANNEL) {
				label = 'improvement';
			}

			const msg: any = (await starterMessage.first()) || (await thread.fetchStarterMessage());
			const body = `👤 Issue created by ${msg.author.username}#${msg.author.discriminator} - Check this [thread on discord](${thread.url}) for the whole conversation.\n\n---\n\n${msg.content}`;
			const { data } = await gh.createIssue(name, body, [label]);

			const status = labelsWithEmojis.find((label) => label.label === 'Backlog')?.emoji;

			await thread.setName(`${status} - ${name}`);

			issueObj.id = data.number;
			issueObj.status = data.labels[0];
			issueObj.issueLink = data.html_url;

			await UptimeService.addChannel(thread);
		} catch (error: Error | any) {
			throw new APIError(error.message);
		}

		issueEmbed = new EmbedBuilder()
			.setColor(config.DC_COLORS.EMBED)
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
		const oldChannelName = stripStatusFromThread(oldThread.name);
		const newChannelName = stripStatusFromThread(newThread.name);

		gh.init();

		if (!oldThread.locked && newThread.locked) {
			logger.verbose(`THREAD > Archived & Locked [${newChannelName}].`);

			UptimeService.removeChannel(newThread);

			return;
		}

		if (newThread.archived) {
			logger.verbose(`THREAD > Archived [${newChannelName}].`);

			UptimeService.removeChannel(newThread);

			return;
		}

		if (oldThread.archived && !newThread.archived) {
			logger.verbose(`THREAD > Unarchived [${newChannelName}].`);

			// UptimeService.addChannel(newThread);

			return;
		}

		await gh.editIssueWoBody(oldChannelName, newChannelName);
	}
	@On({ event: 'threadDelete' })
	async onThreadDelete([thread]: ArgsOf<'threadDelete'>, client: Client): Promise<void> {
		const { name } = thread;

		// @ts-ignore - Interaction name broken it exists but throws error
		const channelName = stripStatusFromThread(interaction.channel?.name);

		logger.verbose(`THREAD > [${channelName}] deleted.`);

		await gh.init();

		await gh.toggleIssue(name);
		await gh.toggleLockIssue(name);

		UptimeService.removeChannel(thread);
	}
	@On({ event: 'threadListSync' })
	async onThreadSync([threads]: ArgsOf<'threadListSync'>, client: Client): Promise<void> {
		logger.verbose(`THREAD > [${threads.size}] thread(s) were synced.`);
	}
}
