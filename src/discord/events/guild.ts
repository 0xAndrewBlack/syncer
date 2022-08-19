import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import type { ArgsOf, Client } from 'discordx';
import { Discord, On } from 'discordx';
import { EmbedBuilder } from 'discord.js';

@Discord()
export class GuildHandler {
	@On({ event: 'guildCreate' })
	onGuildCreate([guild]: ArgsOf<'guildCreate'>, client: Client): void {
		logger.verbose(`Guild joined ${guild.name}`);

		const defaultChannel = guild.systemChannel;
		const setUpEmbed = new EmbedBuilder()
			.setTitle('Yo!')
			.setURL('https://github.com/0xAndrewBlack/github-discord-sync')
			.setColor('#6D0CE3')
			.setDescription(
				"Yo, it's Sync!\n\nRead the following embed to learn how to sync your issues.\nFor more documentation visit the GitHub repo or the GitHub Wiki (the link is in the embed title).\n\n"
			)
			.addFields([
				{
					name: `*️⃣ Create Issue`,
					value: `An issue will be created when a new thread is made under the corresponding channel.\n\n`,
				},
				{
					name: `✏️ Edit Issue`,
					value: `To edit an issue use the \`/issue\` slash command.\n\n`,
				},
				{
					name: `✅ Update Label`,
					value: `Use the \`/label\` command.\n\n`,
				},
				{
					name: `❌ Close or Delete an Issue`,
					value: `Archive or Lock the thread to close/lock the issue.\n\nUnfortunately, it's not possible to delete Issues, yet.\n\n`,
				},
				// {
				// 	name: `🚩 Help the developers.`,
				// 	value: `Use the \`/feedback\` command to give feedback about anything related to the BOT.\n\n\`Note: With GitHub and other API related Issues unfortunately we can't help. 😢\`\n\n`,
				// },
			])
			.setThumbnail(String(client.user?.displayAvatarURL()))
			.setFooter({
				text: 'Sync by ZGEN.',
				iconURL: client.user?.displayAvatarURL(),
			})
			.setTimestamp();

		defaultChannel?.send({ embeds: [setUpEmbed] });
	}
}
