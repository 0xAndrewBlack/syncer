import type { CommandInteraction, ModalSubmitInteraction } from 'discord.js';
import { ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

import { Discord, ModalComponent, Slash } from 'discordx';
import { getGuildInfo } from '../utils/dbFunctions.js';

import { GitHubService } from '../services/githubService.js';
import { stripStatusFromThread } from '../utils/utils.js';

const gh = new GitHubService();

@Discord()
export class EditIssue {
	@Slash('editissue')
	async attachment(interaction: CommandInteraction): Promise<void> {
		if (!interaction.channel?.isThread()) {
			await interaction.reply('Channel is not thread channel.');
			return;
		}

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

	@ModalComponent('Edit Issue')
	async handle(interaction: ModalSubmitInteraction): Promise<void> {
		if (!interaction.channel?.isThread()) {
			await interaction.reply('Channel is not thread channel.');
			return;
		}

		const [issueTitle, issueBody] = ['issueTitle', 'issueBody'].map((id) => interaction.fields.getTextInputValue(id));
		const status = interaction.channel.name.split(' ')[0];

		interaction.reply(`issue title: ${issueTitle}, issue body: ${issueBody}`).then((d) => {
			// @ts-ignore
			interaction.channel.setName(`${status} - ${issueTitle}`);
		});

		const guildId: any = interaction.guildId;
		const { repo_name, repo_owner, project_id } = await getGuildInfo(guildId);

		await gh.populate(guildId, repo_owner, repo_name, project_id);
		await gh.editIssue(stripStatusFromThread(interaction.channel.name), issueTitle, issueBody);

		return;
	}
}
