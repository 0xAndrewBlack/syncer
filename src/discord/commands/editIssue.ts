import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { CommandInteraction, EmbedBuilder, ModalSubmitInteraction } from 'discord.js';
import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import { Discord, Guard, ModalComponent, Slash } from 'discordx';
import { Description, PermissionGuard } from '@discordx/utilities';

import { stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { IsThread } from '../guards/IsThread.Guard.js';

@Discord()
@Guard(IsThread)
export class EditIssue {
	@Slash({ name: 'issue' })
	@Guard(PermissionGuard(['SendMessages']))
	@Description('Edits issue title and body via a modal.')
	async showModal(interaction: CommandInteraction): Promise<void> {
		const modal = new ModalBuilder().setTitle('Edit Issue').setCustomId('Edit Issue');

		const issueTitle = new TextInputBuilder()
			.setCustomId('issueTitle')
			.setLabel('Issue Title')
			.setStyle(TextInputStyle.Short);

		const issueBody = new TextInputBuilder()
			.setCustomId('issueBody')
			.setLabel('Issue Body')
			.setStyle(TextInputStyle.Paragraph);

		const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(issueTitle);

		const row3 = new ActionRowBuilder<TextInputBuilder>().addComponents(issueBody);

		modal.addComponents(row2, row3);

		interaction.showModal(modal);
	}

	@ModalComponent({ id: 'Edit Issue' })
	async handleModal(interaction: ModalSubmitInteraction): Promise<void> {
		const [issueTitle, issueBody] = ['issueTitle', 'issueBody'].map((id) => interaction.fields.getTextInputValue(id));
		// @ts-ignore - Interaction name broken it exists but throws error
		const channelName = stripStatusFromThread(interaction.channel?.name);
		// @ts-ignore
		const status = interaction.channel.name.split(' ')[0];
		const body = `👤 Issue created by ${interaction.user.username}#${interaction.user.discriminator} - Check the [thread on discord](${interaction.channel?.url}) for the whole conversation.\n\n---\n\n${issueBody}`;
		// @ts-ignore
		await gh.editIssue(channelName, issueTitle, body);

		const issueEmbed = new EmbedBuilder()
			.setColor(config.DC_COLORS.SUCCESS)
			.setTitle(`✨ Issue \`${issueTitle}\` updated successfully.`);

		// @ts-ignore
		logger.verbose(`SYNCER > Issue [${issueTitle}] changed.`);

		await interaction.reply({
			embeds: [issueEmbed],
			ephemeral: true,
		});

		// @ts-ignore
		interaction.channel.setName(`${status} - ${issueTitle}`);

		return;
	}
}
