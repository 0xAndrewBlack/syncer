import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, GuildMember } from 'discord.js';
import { Description, PermissionGuard } from '@discordx/utilities';
import { Client, Discord, Guard, Slash, SlashOption } from 'discordx';
import { db } from '../../utils/helpers.js';

@Discord()
export class AddUser {
	@Slash({ name: 'adduser' })
	@Guard(PermissionGuard(['SendMessages']))
	@Description(`Adds user to db.`)
	async addUser(
		@SlashOption({
			name: 'username',
			type: ApplicationCommandOptionType.User,
			description: 'Discord User',
			required: true,
		})
		mentionedAssignee: GuildMember,
		@SlashOption({ name: 'name', description: 'Custom name', required: true })
		name: string,
		@SlashOption({ name: 'github', description: 'GitHub username', required: true })
		github: string,
		interaction: CommandInteraction,
		client: Client
	): Promise<void> {
		const user = await db.users.upsert({
			select: {
				user_id: true,
				discord_handle: true,
				user_name: true,
			},
			where: {
				user_id: mentionedAssignee.id,
			},
			create: {
				user_name: name,
				github_handle: github,
				user_id: mentionedAssignee.user.id,
				discord_handle: `${mentionedAssignee.user.username}#${mentionedAssignee.user.discriminator}`,
			},
			update: {
				user_name: name,
				github_handle: github,
				user_id: mentionedAssignee.user.id,
				discord_handle: `${mentionedAssignee.user.username}#${mentionedAssignee.user.discriminator}`,
			},
		});

		await interaction.reply({
			ephemeral: true,
			content: `${user.user_name} has been added to the user list.`,
		});

		logger.verbose(`[${user.user_name}] has been added to the user list by [${interaction.user.username}].`);
	}
}
