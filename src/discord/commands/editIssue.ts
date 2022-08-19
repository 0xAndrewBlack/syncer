import { config } from '../../config.js';
import logger from '../../utils/logger.js';

import { CommandInteraction, EmbedBuilder, ModalSubmitInteraction, PermissionFlagsBits } from 'discord.js';
import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import { Discord, Guard, ModalComponent, Slash } from 'discordx';
import { Description } from '@discordx/utilities';

import { stripStatusFromThread } from '../../utils/discord.js';
import { gh } from '../../services/githubService.js';

import { NotThread } from '../guards/NotThread.Guard.js';

@Discord()
@Guard(NotThread)
export class EditIssue {
	@Slash({ name: 'issue', defaultMemberPermissions: PermissionFlagsBits.SendMessages })
	@Description('Edits issue title and body via a modal.')
	async attachment(interaction: CommandInteraction): Promise<void> {
		// Create the modal
		const modal = new ModalBuilder().setTitle('Edit Issue').setCustomId('Edit Issue');

		// Create text input fields
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

		// Add action rows to form
		modal.addComponents(row2, row3);

		// Present the modal to the user
		interaction.showModal(modal);
	}

	@ModalComponent({ id: 'Edit Issue' })
	async handle(interaction: ModalSubmitInteraction): Promise<void> {
		const [issueTitle, issueBody] = ['issueTitle', 'issueBody'].map((id) => interaction.fields.getTextInputValue(id));
		// @ts-ignore
		const status = interaction.channel.name.split(' ')[0];
		// @ts-ignore
		await gh.editIssue(stripStatusFromThread(interaction.channel.name), issueTitle, issueBody);

		const issueEmbed = new EmbedBuilder()
			.setColor('#3DE14E')
			.setTitle(`✨ Issue \`${issueTitle}\` updated successfully.`);

		await interaction.reply({
			embeds: [issueEmbed],
			ephemeral: true,
		});

		// @ts-ignore
		interaction.channel.setName(`${status} - ${issueTitle}`);

		return;
	}
}
